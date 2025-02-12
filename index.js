import express from 'express';
import bodyParser from 'body-parser';

import { getCounts, getTiming } from './segments/flesch.js';
import { getFrequencies } from './segments/frequency.js';
import { getTone } from './segments/tone.js';
import { getScore } from './segments/score.js';
import { getErrors } from './segments/errors.js';

const analyze = async (text) => {
    const tone = await getTone(text);
    const errors = await getErrors(text);

    const score = getScore(errors);
    const counts = getCounts(text);
    const timing = getTiming(text);
    const frequencies = getFrequencies(text);

    const data = {
        score: score,
        counts: counts,
        timing: timing,
        tone: tone,
        frequencies: frequencies,
        errors: errors
    };

    return data;
}

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/analyze-text', async (req, res) => {
    // Retrieve data from the request body
    const { text } = req.body;

    const analysis = await analyze(text);
    res.status(200).json(analysis);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Also temporarily host the frontend on the same server, the public folder
app.use(express.static('public'));