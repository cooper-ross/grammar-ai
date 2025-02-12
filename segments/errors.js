import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });

// This is a "tool" that actually just fills the json we need, technically allowing the api to generate structured json data
const errorTools = [{
    type: "function",
    function: {
        name: "fix-grammar",
        description: "Fixes grammar errors in the text and returns the corrected text. The grammar correction model is trained on a diverse range of text genres and styles, and it can handle a wide variety of grammatical errors, including punctuation, capitalization, verb tense, subject-verb agreement, pronoun-antecedent agreement, and more. The model is designed to be robust and flexible, and it can correct a wide range of grammatical errors in different contexts. The grammar correction model is based on state-of-the-art natural language processing techniques and can provide accurate and reliable corrections for a wide range of text inputs, including short messages, long documents, and mixed-language text.",
        parameters: {
            type: "object",
            properties: {
                errors: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            errorType: {
                                type: "string",
                                enum: [
                                    "spelling",
                                    "grammar",
                                    "punctuation",
                                    "capitalization",
                                    "verbTense",
                                    "subjectVerbAgreement",
                                    "pronounAntecedentAgreement",
                                    "wordChoice",
                                    "redundancy",
                                    "wordiness",
                                    "clarity",
                                    "consistency",
                                    "parallelism",
                                    "idiomatic",
                                    "style",
                                    "other"
                                ],
                                description: "The type of grammar error."
                            },
                            original: {
                                type: "string",
                                description: "The original text for the error. Must be *exactly* matching! No shortening, abbreviating, or anything! It is crucial this text matches the text you are going to correct."
                            },
                            fixed: {
                                type: "string",
                                description: "The corrected text for the error."
                            },
                            intensity: {
                                type: "number",
                                description: "A score from 0 to 1 indicating the severity of the grammar error. Higher is more severe. If it's just rewording, it's 0. If it's a critical error, it's 1.",
                                minimum: 0,
                                maximum: 1
                            },
                            message: {
                                type: "string",
                                description: "A message describing the grammar error, provided it is not self-explanatory (not to be used for some spelling errors). Keep it concise and informative!"
                            }
                        },
                        required: [
                            "errorType",
                            "original",
                            "fixed",
                            "intensity",
                            "message"
                        ]
                    },
                    description: "A list of grammar errors in the text.",
                    minItems: 0
                }
            }
        }
    }
}];

const errorExplanations = {
    spelling: {
        description: "Spelling errors, such as typos, misspelled words, or incorrect word forms.",
        impact: 0.9
    },
    grammar: {
        description: "General grammar errors, such as incorrect verb forms, missing articles, or incorrect word order.",
        impact: 0.8
    },
    punctuation: {
        description: "Punctuation errors, such as missing commas, periods, or quotation marks.",
        impact: 0.7
    },
    capitalization: {
        description: "Capitalization errors, such as missing capital letters or incorrect capitalization of proper nouns.",
        impact: 0.6
    },
    redundancy: {
        description: "Redundant phrases, such as repeated words, unnecessary phrases, or redundant expressions.",
        impact: 0.6
    },
    verbTense: {
        description: "Verb tense errors, such as incorrect verb forms or inconsistent verb tenses.",
        impact: 0.5
    },
    subjectVerbAgreement: {
        description: "Subject-verb agreement errors, such as mismatched subjects and verbs or incorrect verb forms.",
        impact: 0.5
    },
    pronounAntecedentAgreement: {
        description: "Pronoun-antecedent agreement errors, such as mismatched pronouns and antecedents or incorrect pronoun forms.",
        impact: 0.5
    },
    clarity: {
        description: "Unclear sentences, such as ambiguous statements, confusing descriptions, or unclear explanations.",
        impact: 0.4
    },
    wordChoice: {
        description: "Word choice errors, such as incorrect word forms or awkward phrasing",
        impact: 0.2
    },
    wordiness: {
        description: "Wordy sentences, such as long-winded phrases, verbose descriptions, or convoluted language.",
        impact: 0.2
    },
    consistency: {
        description: "Inconsistent usage, such as mixed verb forms, varied sentence structures, or conflicting expressions.",
        impact: 0.2
    },
    parallelism: {
        description: "Parallel structure errors, such as mismatched sentence patterns, inconsistent lists, or unbalanced comparisons.",
        impact: 0.2
    },
    idiomatic: {
        description: "Idiomatic expressions, such as colloquial phrases, slang terms, or regional dialects.",
        impact: 0.1
    },
    style: {
        description: "Stylistic issues, such as tone inconsistencies, inappropriate language, or stylistic mismatches.",
        impact: 0.1
    },
    other: {
        description: "Other types of errors that do not fit into the predefined categories.",
        impact: 0.1
    }
};

const queryErrorData = async (text) => {
    const messages = [
        { role: "system", content: `Please find and correct the grammar errors in the following text! Look for repeated words, wordy sentences, tense issues, and all the other crazy complicated features of the english language. Read it twice, and go through it with a fine-tooth comb for any and all errors (but don't overcompensate: it's more important to be 100% sure it's an error than it is to just correct something anyway)! Thank you!` },
        { role: "user", content: text }
    ];

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        tools: errorTools
    });

    const responseMessage = response.choices[0].message;
    const toolCalls = responseMessage.tool_calls;

    return toolCalls.map(toolCall => JSON.parse(toolCall.function.arguments));
}

export const getErrors = async (text) => {
    const errors = await queryErrorData(text);

    const fullErrorList = [];
    errors.forEach(error => {
        if (!error || !error.errors) return;
        error.errors.forEach(e => {
            fullErrorList.push(e);
        });
    });

    fullErrorList.forEach(error => {
        const type = error.errorType;
        const explanation = errorExplanations[type];
        error.impact = explanation ? explanation.impact : 0.1;
    });

    // Now, here's the fun part. The AI can't actually tell us accurately where the errors are, so we need to find the start and end indices of each error ourselves.
    // Since text can be repeated, we use the knowledge that the errors are in the same order as the text, and we can find the start and end indices by comparing the original and fixed text.
    // So we just find the first instance of each error, and then remove all text (including the error) up to that point, and then find the first instance of the next error.
    // This way, we can find the start and end indices of each error.
    let originalText = text;
    fullErrorList.forEach(error => {
        const original = error.original;

        const startIndex = originalText.indexOf(original);
        const endIndex = startIndex + original.length;

        error.startIndex = startIndex;
        error.endIndex = endIndex;

        originalText = originalText.slice(endIndex);
    });

    return fullErrorList;
}