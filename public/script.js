const premadeText = "Remember when you were a careless eight-year-old kid riding a bike with your friends, racing each other around the neighborhood? Remember that feeling of absolute freedom as you felt the wind in your hair and the smile it put on your face? I never thought I would feel that way as a grown-up until my friends presented me with a brand-new red bike. At first, I was a bit skeptical about the idea of commuting by bike. One morning a couple of days later, I  completely changed my mind. I was stuck in a traffic jam and saw in my rear mirror a man in a suit riding a classy bike with his laptop case in one hand and a handlebar in the other. I figured out it would take him about 15 minutes to get to the office while I was still sitting in my car and waiting for the cars in line ahead to move, even if just for an inch. I was always very afraid of being late for my business meetings. That is when I decided to get on the bike. I haven’t regretted my decision so far. One of the best things about cycling is that the bike is perfect for exercising. Just cycling to and from work or to the shops every day is enough to keep you healthy and happy. Besides, it's incredibly liberating to be able to get anywhere without losing time in traffic jams. Also, don’t forget about the environmental benefits. Cycling helps to reduce air pollution while reducing also traffic congestion and the need for gas.At some point, I realized that I started to use the bike more often, not only to get to work but also to catch up with friends and to head out for coffee on weekends. I loved this style of traveling because it lets you appreciate what you are seeing around you. You can stop anywhere you want and yet you can cover a lot of distance. That daily distance I rode to work was no longer enough for me. I started riding to the nearest decent mountain bike trails so I could spend the day going up and down hills. I did it because it was fun. Because I enjoyed it.OK, I knew I couldn’t ride across the oceans. I came up with the idea to ride across each of the continents, from coast to coast. The more I thought about it, the more excited I became about my plans. If I will do this, I will have to thoroughly prepare, I thought. I was also very scared. Would I be able to make it over towering mountains and across burning deserts? What if I got lost somewhere and didn’t know the language?After a few months of training, I set off. This was hard at first, but soon I realized that everywhere I went people cheered me on when they heard about my journey. The newspaper back home reported on my progress. Once or twice I ran out of money and has to spend a couple of weeks doing odd jobs before I could continue on my way. I never gave up on my idea, and a year and six months later, I found myself pedaling back toward the place where it all began. my journey was over and I was home. These days, I continue exploring the world with my bike as often as I can. Thanks to my bike, I’ve made countless friends, seen incredible sights, and had unforgettable adventures. I would have missed out on all of that if I hadn’t decided to try biking instead of driving! I guess there is an upside to traffic jams after all!";
const premadeResponse = {
    "score": 81,
    "counts": {
        "words": 622,
        "sentences": 29,
        "characters": 3216,
        "fleschScore": 68.09,
        "fleschGrade": 9.09,
        "paragraphs": 13,
        "averageCharactersPerWord": 5.17,
        "avgSyllablesPerWord": 1.38,
        "avgwordsPerSentence": 21.44,
        "sentencesPerParagraph": 2.23
    },
    "timing": {
        "reading": {
            "readingSeconds": 150,
            "readingMinutes": 2,
            "readingHours": 0
        },
        "speaking": {
            "speakingSeconds": 244,
            "speakingMinutes": 4,
            "speakingHours": 0
        }
    },
    "tone": {
        "sortedTones": [
            [
                "informative",
                0.9
            ],
            [
                "optimistic",
                0.9
            ],
            [
                "friendly",
                0.8
            ],
            [
                "respectful",
                0.8
            ],
            [
                "empathetic",
                0.7
            ],
            [
                "casual",
                0.6
            ],
            [
                "persuasive",
                0.5
            ],
            [
                "poetic",
                0.4
            ]
        ],
        "allTones": {
            "formal": 0.4,
            "casual": 0.6,
            "friendly": 0.8,
            "informative": 0.9,
            "opinionated": 0.3,
            "persuasive": 0.5,
            "humorous": 0.2,
            "serious": 0.6,
            "empathetic": 0.7,
            "critical": 0.2,
            "respectful": 0.8,
            "disrespectful": 0.1,
            "optimistic": 0.9,
            "pessimistic": 0.2,
            "poetic": 0.4
        }
    },
    "frequencies": {
        "rarePercentage": 0.05,
        "uniquePercentage": 0.61,
        "partsOfSpeech": [
            {
                "type": "Verb",
                "frequency": 0.22
            },
            {
                "type": "Adverb",
                "frequency": 0.08
            },
            {
                "type": "Function Word",
                "frequency": 0.39
            },
            {
                "type": "Noun",
                "frequency": 0.15
            },
            {
                "type": "Adjective",
                "frequency": 0.04
            },
            {
                "type": "Numerals",
                "frequency": 0.01
            }
        ]
    },
    "errors": [
        {
            "errorType": "punctuation",
            "original": "completely changed my mind.",
            "fixed": "completely changed my mind:",
            "intensity": 0.3,
            "message": "Replace the period with a colon for better sentence structure.",
            "impact": 0.7
        },
        {
            "errorType": "punctuation",
            "original": "reducing also traffic congestion",
            "fixed": "also reducing traffic congestion",
            "intensity": 0.5,
            "message": "Move the adverb for better sentence flow.",
            "impact": 0.7
        },
        {
            "errorType": "punctuation",
            "original": "I loved this style",
            "fixed": "I love this style",
            "intensity": 0.3,
            "message": "Change the form of the verb for consistency.",
            "impact": 0.7
        },
        {
            "errorType": "spelling",
            "original": "of traveling because it lets",
            "fixed": "of travelling because it lets",
            "intensity": 0.3,
            "message": "Spell travelling correctly.",
            "impact": 0.9
        },
        {
            "errorType": 'punctuation',
            "original": 'OK,',
            "fixed": 'Ok,',
            "intensity": 0.1,
            "message": "Spell out 'Ok' for a more formal tone.",
            "impact": 0.7
        },
        {
            "errorType": "verbTense",
            "original": "If I will do this",
            "fixed": "If I do this",
            "intensity": 0.5,
            "message": "Correct future tense to match the conditional clause.",
            "impact": 0.5,
        },
        {
            "errorType": "verbTense",
            "original": "has to spend a couple of weeks",
            "fixed": "had to spend a couple of weeks",
            "intensity": 0.7,
            "message": "Correct the verb tense to maintain consistency with the past narrative.",
            "impact": 0.5
        },
        {
            "errorType": "spelling",
            "original": "found myself pedaling back toward",
            "fixed": "found myself pedalling back toward",
            "intensity": 0.5,
            "message": "Spell pedalling correctly.",
            "impact": 0.9
        },
        {
            "errorType": "punctuation",
            "original": "my journey was over and I was home.",
            "fixed": "My journey was over, and I was home.",
            "intensity": 0.3,
            "message": "Capitalize the first letter at the start and add a comma for clarity.",
            "impact": 0.7
        },
    ]
}

// https://stackoverflow.com/questions/3935385/determine-if-two-strings-are-similar-in-javascript
function getStringDifference(stringA, stringB) {
    var cost = [],
    str1 = stringA,
    str2 = stringB,
    n = str1.length,
    m = str2.length,
    i, j;

    var minimum = function (a, b, c) {
        var min = a;
        if (b < min) {
            min = b;
        }
        if (c < min) {
            min = c;
        }
        return min;
    };

    if (n == 0) {
        return;
    }
    if (m == 0) {
        return;
    }

    for (var i = 0; i <= n; i++) {
        cost[i] = [];
    }

    for (i = 0; i <= n; i++) {
        cost[i][0] = i;
    }

    for (j = 0; j <= m; j++) {
        cost[0][j] = j;
    }

    for (i = 1; i <= n; i++) {

        var x = str1.charAt(i - 1);

        for (j = 1; j <= m; j++) {

        var y = str2.charAt(j - 1);

        if (x == y) {

            cost[i][j] = cost[i - 1][j - 1];

        } else {

            cost[i][j] = 1 + minimum(cost[i - 1][j - 1], cost[i][j - 1], cost[i - 1][j]);
        }

        } //endfor

    } //endfor

    return cost[n][m];
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeFromSeconds(totalSeconds) {
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes} min ${seconds} sec`;
}

function toTitleCase(text) {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
}

const getScore = (errors) => {
    errors = errors.filter(val => (val != undefined));

    // Calculate the overall impact of the errors multiplied by their respective intensities (impact * intensity)
    const totalImpact = errors.reduce((acc, error) => {
        const impact = error.impact;
        const intensity = error.intensity || 0;

        return acc + (impact * intensity);
    }, 0);

    // Implement the formula for the reading score
    const zeroShift = Math.log(100) / Math.log(2);
    const errorPortion = -Math.pow(2, (-totalImpact / 8) + (zeroShift)) + 100;

    const totalScore = Math.round((100 - errorPortion));

    return totalScore;
}

function displayAnalysis(response) {
    // Useful for those who want the JSON object
    console.log(response);

    // Performance (Left Side)
    const readingTime = timeFromSeconds(response.timing.reading.readingSeconds)
    const speakingTime = timeFromSeconds(response.timing.speaking.speakingSeconds)

    $("#characters").text(numberWithCommas(response.counts.characters));
    $("#words").text(numberWithCommas(response.counts.words));
    $("#reading").text(readingTime);
    $("#speaking").text(speakingTime);

    $("#readability-score").text(response.counts.fleschScore.toFixed(0));
    $("#reading-grade").text(response.counts.fleschGrade.toFixed(0));
    $("#paragraphs").text(response.counts.paragraphs);
    $("#word-length").text(response.counts.averageCharactersPerWord);
    $("#words-per-sentence").text(response.counts.avgwordsPerSentence);
    $("#sentences-per-paragraph").text(response.counts.sentencesPerParagraph);

    const $tones = $(".bars");
    $tones.empty();

    for (let i = 0; i < 3; i++) {
        const tone = response.tone.sortedTones[i];
        const name = toTitleCase(tone[0]);
        $tones.append(`<li><strong>${name}:</strong><div class="progress-bar"><div class="progress" style="transform: scaleX(${tone[1]});"></div></div></li>`)
    }

    $("#rare-words").text(`${(response.frequencies.rarePercentage * 100).toFixed(0)}%`);
    $("#unique-words").text(`${(response.frequencies.uniquePercentage * 100).toFixed(0)}%`);
    $("#verb-frequency").text(`${(response.frequencies.partsOfSpeech[0].frequency * 100).toFixed(0)}%`);
    $("#adverb-frequency").text(`${(response.frequencies.partsOfSpeech[1].frequency * 100).toFixed(0)}%`);
    $("#noun-frequency").text(`${(response.frequencies.partsOfSpeech[3].frequency * 100).toFixed(0)}%`);

    // Suggestions (Right Side)
    $("#overall-score").text(`Overall Score: ${getScore(response.errors)}`);

    const $correctionsList = $(".corrections-tab ul");
    $correctionsList.empty();

    const errors = response.errors;
    let text = $("#content").text();

    for (let i = 0; i < errors.length; i++) {
        const error = errors[i];
        
        $correctionsList.append(`<li>
            <div id="${i}" class="correction">
                <strong>${toTitleCase(error.errorType)}</strong> <i class='bx bxs-alarm-exclamation'></i>
                <p>${error.message}</p>	
                <hr>
                <strong class="small">Before:</strong><p class="small">${error.original}</p>
                <strong class="small">After:</strong><p class="small">${error.fixed}</p>
            </div>
        </li>`);

        const startIndex = text.search(error.original);

        const subText = text.slice(startIndex, startIndex + error.original.length);
        text = text.replace(subText, `<span id="${i}" style="background-color: rgb(255, 179, 179);">${subText}</span>`);
    }

    $("#content").html(text);
    $(".correction").click(function(){
        const error = errors[this.id];

        $(`#${this.id}`).replaceWith(error.fixed);
        $(this).parent().remove();

        response.errors[this.id] = undefined;
        const score = getScore(response.errors);
        $("#overall-score").text(`Overall Score: ${score}`);
    })
}

// Use ajax to query our api at port 3000
// This function will be called when the user clicks the "Analyze" button
function analyzeText() {
    // // Get the text from the textarea
    const text = $("#content").text();

    // So we don't waste resources running the example over and over, and so you can get a feel for it without using your api key
    if (getStringDifference(text, premadeText) < 50) {
        return displayAnalysis(premadeResponse)
    }

    // Send a POST request to the server
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/analyze-text",
        data: JSON.stringify({ text: text }),
        contentType: "application/json",
        success: function (response) {
            // Display the analysis results
            displayAnalysis(response);
        },
        error: function (error) {
            console.log(error);
        },
    });
}

$(function () {
    // When the user clicks the "Analyze" button, call the analyzeText function
    $("#analyze").click(analyzeText);
});

// All code below this point is property of Fajar Nur Wahid
function formatDoc(cmd, value=null) {
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

const content = document.getElementById('content');

content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item=> {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})

const filename = document.getElementById('filename');

function fileHandle(value) {
	if(value === 'new') {
		content.innerHTML = '';
		filename.value = 'untitled';
	} else if(value === 'txt') {
		const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if(value === 'pdf') {
		html2pdf(content).save(filename.value);
	}
}