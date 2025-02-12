import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });

// This is a "tool" that actually just fills the json we need, technically allowing the api to generate structured json data
const toneTools = [{
    type: "function",
    function: {
        name: "tone-detection",
        description: "Detects the tone of the text and returns scores for various tone attributes. The tone attributes are formal, casual, friendly, informative, opinionated, persuasive, humorous, serious, empathetic, critical, respectful, disrespectful, optimistic, pessimistic, and poetic. Each score is a number between 0 and 1, where 0 is the lowest and 1 is the highest. Higher scores indicate a stronger presence of that tone attribute in the text. The tone attributes are not mutually exclusive, and the text can have multiple tones at the same time. For example, a text can be both formal and friendly, or serious and humorous. The tone detection model is trained on a diverse range of text genres and styles, and it can detect a wide variety of tones in different contexts. The model is designed to be robust and flexible, and it can handle a wide range of text inputs, including short messages, long documents, and mixed-language text.",
        parameters: {
            type: "object",
            properties: {
                formal: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how formal the text is.the text is. Higher is more formal. A serious, objective, and polished tone, suitable for academic or business writing."
                },
                casual: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how casual the text is.the text is. Higher is more casual. A friendly, conversational, and informal tone, suitable for personal communication."
                },
                friendly: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how friendly the text is.the text is. Higher is more friendly. A warm, welcoming, and supportive tone, suitable for customer service or personal communication."
                },
                informative: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how informative the text is.the text is. Higher is more informative. A factual, educational, and informative tone, suitable for explaining complex topics or providing instructions."
                },
                opinionated: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how opinionated the text is.the text is. Higher is more opinionated. A subjective, biased, and opinionated tone, suitable for expressing personal views or beliefs."
                },
                persuasive: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how persuasive the text is.the text is. Higher is more persuasive. A convincing, compelling, and motivational tone, suitable for marketing or political communication."
                },
                humorous: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how humorous the text is.the text is. Higher is more humorous. A funny, entertaining, and light-hearted tone, suitable for comedy or satire."
                },
                serious: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how serious the text is.the text is. Higher is more serious. A somber, grave, and solemn tone, suitable for discussing sensitive topics or expressing condolences."
                },
                empathetic: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how empathetic the text is.the text is. Higher is more empathetic. A compassionate, caring, and understanding tone, suitable for customer service or personal communication."
                },
                critical: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how critical the text is.the text is. Higher is more critical. A skeptical, analytical, and critical tone, suitable for reviewing or evaluating content."
                },
                respectful: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how respectful the text is.the text is. Higher is more respectful. A polite, considerate, and respectful tone, suitable for professional communication or addressing sensitive topics."
                },
                disrespectful: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how disrespectful the text is.the text is. Higher is more disrespectful. A rude, offensive, and disrespectful tone, suitable for expressing anger or frustration."
                },
                optimistic: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how optimistic the text is.the text is. Higher is more optimistic. A hopeful, positive, and encouraging tone, suitable for motivational writing or personal communication."
                },
                pessimistic: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how pessimistic the text is.the text is. Higher is more pessimistic. A negative, cynical, and discouraging tone, suitable for expressing skepticism or criticism."
                },
                poetic: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    description: "A score from 0 to 1 indicating how poetic the text is.the text is. Higher is more poetic. A lyrical, expressive, and artistic tone, suitable for creative writing or emotional expression."
                }
            },
            required: [
                "formal",
                "casual",
                "friendly",
                "informative",
                "opinionated",
                "persuasive",
                "humorous",
                "serious",
                "empathetic",
                "critical",
                "respectful",
                "disrespectful",
                "optimistic",
                "pessimistic",
                "poetic"
            ]
        }
    }
}];

const toneExplanations = {
    formal: "A serious, objective, and polished tone, suitable for academic or business writing.",
    casual: "A friendly, conversational, and informal tone, suitable for personal communication.",
    friendly: "A warm, welcoming, and supportive tone, suitable for customer service or personal communication.",
    informative: "A factual, educational, and informative tone, suitable for explaining complex topics or providing instructions.",
    opinionated: "A subjective, biased, and opinionated tone, suitable for expressing personal views or beliefs.",
    persuasive: "A convincing, compelling, and motivational tone, suitable for marketing or political communication.",
    humorous: "A funny, entertaining, and light-hearted tone, suitable for comedy or satire.",
    serious: "A somber, grave, and solemn tone, suitable for discussing sensitive topics or expressing condolences.",
    empathetic: "A compassionate, caring, and understanding tone, suitable for customer service or personal communication.",
    critical: "A skeptical, analytical, and critical tone, suitable for reviewing or evaluating content.",
    respectful: "A polite, considerate, and respectful tone, suitable for professional communication or addressing sensitive topics.",
    disrespectful: "A rude, offensive, and disrespectful tone, suitable for expressing anger or frustration.",
    optimistic: "A hopeful, positive, and encouraging tone, suitable for motivational writing or personal communication.",
    pessimistic: "A negative, cynical, and discouraging tone, suitable for expressing skepticism or criticism.",
    poetic: "A lyrical, expressive, and artistic tone, suitable for creative writing or emotional expression."
};

const queryToneData = async (text) => {
    // Basic instructions for the for the AI that give pretty good results
    const messages = [
        { role: "system", content: `Please detect and submit the tone of the following text!` },
        { role: "user", content: text }
    ];

    // Hijack the tool calls to get the tone data
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: messages,
        tools: toneTools
    });

    const responseMessage = response.choices[0].message;
    const toolCalls = responseMessage.tool_calls;

    return toolCalls.map(toolCall => JSON.parse(toolCall.function.arguments));
}

export const getTone = async (text) => {
    const toneData = await queryToneData(text);

    // We should generally get two function calls that have similar data, so we can just average them together
    const averageTone = toneData.reduce((acc, tone) => {
        for (const key in tone) {
            if (acc[key] === undefined) acc[key] = 0;
            acc[key] += tone[key];
        }

        return acc;
    }, {});

    for (const key in averageTone) {
        averageTone[key] /= toneData.length;
        averageTone[key] = Math.round(averageTone[key] * 100) / 100;
    }

    // We track antagonistic pairs (eg. formal vs casual) and see which one is higher for each pair
    const pairs = [
        ["formal", "casual"],
        ["friendly", "serious"],
        ["informative", "opinionated"],
        ["persuasive", "critical"],
        ["humorous", "serious"],
        ["empathetic", "disrespectful"],
        ["optimistic", "pessimistic"]
    ];

    // Now we can filter to include only the highest of each pair (and any that are not part of a pair)
    const filteredTone = Object.entries(averageTone).filter(([key, value]) => {
        if (pairs.some(pair => pair.includes(key))) {
            const pair = pairs.find(pair => pair.includes(key));
            const otherKey = pair.find(p => p !== key);

            return averageTone[key] > averageTone[otherKey];
        }

        return true;
    });

    const sortedTones = filteredTone.sort((a, b) => b[1] - a[1]);

    return {
        sortedTones: sortedTones,
        allTones: averageTone
    }
}