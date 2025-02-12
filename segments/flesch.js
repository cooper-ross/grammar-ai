const countSyllables = x => {
    /*
     * basic algortithm: each vowel-group indicates a syllable, except for: final
     * (silent) e 'ia' ind two syl @AddSyl and @SubSyl list regexps to massage the
     * basic count. Each match from @AddSyl adds 1 to the basic count, each
     * @SubSyl match -1 Keep in mind that when the regexps are checked, any final
     * 'e' will have been removed, and all '\'' will have been removed.
     */
    const subSyl = [
        /cial/,
        /tia/,
        /cius/,
        /cious/,
        /giu/, // belgium!
        /ion/,
        /iou/,
        /sia$/,
        /.ely$/, // absolutely! (but not ely!)
        /sed$/, // doused, housed, used
    ]

    const addSyl = [
        /ia/,
        /riet/,
        /dien/,
        /iu/,
        /io/,
        /ii/,
        /[aeiouym]bl$/, // -Vble, plus -mble
        /[aeiou]{3}/, // agreeable
        /^mc/,
        /ism$/, // -isms
        /([^aeiouy])\1l$/, // middle twiddle battle bottle, etc.
        /[^l]lien/, // // alien, salient [1]
        /^coa[dglx]./, // [2]
        /[^gq]ua[^auieo]/, // i think this fixes more than it breaks
        /dnt$/, // couldn't
    ]

    // (comments refer to titan's /usr/dict/words)
    // [1] alien, salient, but not lien or ebbullient...
    // (those are the only 2 exceptions i found, there may be others)
    // [2] exception for 7 words:
    // coadjutor coagulable coagulate coalesce coalescent coalition coaxial

    const xx = x.toLowerCase().replace(/'/g, '').replace(/e\b/g, '')
    const scrugg = xx.split(/[^aeiouy]+/).filter(Boolean) // '-' should be perhaps added?

    return (undefined === x || null === x || '' === x) ? 0 :
           (1 === xx.length) ? 1 :
           subSyl.map(r => (xx.match(r) || []).length).reduce((a, b) => a - b) +
           addSyl.map(r => (xx.match(r) || []).length).reduce((a, b) => a + b) +
           scrugg.length - ((scrugg.length > 0 && '' === scrugg[0]) ? 1 : 0) +
           // got no vowels? ("the", "crwth")
           xx.split(/\b/).map(x => x.trim()).filter(Boolean).filter(x => !x.match(/[.,'!?]/g)).map(x => x.match(/[aeiouy]/) ? 0 : 1).reduce((a, b) => a + b)
}

export const countWords = x => (x.split(/\s+/) || ['']).length
export const countSentences = x => (x.split('. ') || ['']).length
export const countSyllablesPerWord = x => countSyllables(x) / countWords(x)
export const countWordsPerSentence = x => countWords(x) / countSentences(x)

export const rate = x => 206.835 - 1.015 * countWordsPerSentence(x) - 84.6 * countSyllablesPerWord(x)
export const grade = x => 0.39 * countWordsPerSentence(x) + 11.8 * countSyllablesPerWord(x) - 15.59

export const getTiming = (text) => {
    const wordCount = countWords(text);

    const readingTime = wordCount / 248; // Reading speed: 248 words per minute
    const speakingTime = wordCount / 153; // Speaking speed: 150-160 words per minute
    
    const readingSeconds = Math.round(readingTime * 60);
    const readingMinutes = Math.floor(readingTime);
    const readingHours = Math.floor(readingTime / 60);

    const speakingSeconds = Math.round(speakingTime * 60);
    const speakingMinutes = Math.floor(speakingTime);
    const speakingHours = Math.floor(speakingTime / 60);

    return {
        reading: {
            readingSeconds,
            readingMinutes,
            readingHours
        },
        speaking: {
            speakingSeconds,
            speakingMinutes,
            speakingHours
        }
    }
}

export const getCounts = (text) => {
    const wordCount = countWords(text);
    const sentenceCount = Math.floor(countSentences(text) * 100) / 100;
    const paragraphCount = text.split("\n").length;

    const avgWordsPerSentence = Math.floor(countWordsPerSentence(text) * 100) / 100;
    const avgSyllablesPerWord = Math.floor(countSyllablesPerWord(text) * 100) / 100;

    const sentencesPerParagraph = Math.floor((sentenceCount / paragraphCount) * 100) / 100;
    const averageCharactersPerWord = Math.floor((text.length / wordCount) * 100) / 100;

    const fleschScore = Math.floor(rate(text) * 100) / 100;
    const fleschGrade = Math.ceil(grade(text) * 100) / 100;

    return {
        words: wordCount,
        sentences: sentenceCount,
        characters: text.length,
        fleschScore: fleschScore,
        fleschGrade: fleschGrade,
        paragraphs: paragraphCount,
        averageCharactersPerWord: averageCharactersPerWord,
        avgSyllablesPerWord: avgSyllablesPerWord,
        avgwordsPerSentence: avgWordsPerSentence,
        sentencesPerParagraph: sentencesPerParagraph
    }
}