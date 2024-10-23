const pronouns = {
    "1st": { singular: "I", plural: "we" },
    "2nd": { singular: "you", plural: "you all" },
    "3rd": { singular: "he/she/they", plural: "they" },
};

const settings = {
    format: {
        type: "radio",
        options: [
            `blurb (<280 characters)`,
            "poem",
            "haiku",
            "short piece (<1000 words)",
            "long piece (>1000 words)",
        ],
    },
    person: { type: "radio", options: Object.keys(pronouns) },
    number: { type: "radio", options: ["singular", "plural"] },
    voice: {
        type: "checkbox",
        options: [
            "journalist",
            "academic",
            "professional",
            "stranger",
            "friend",
            "advertiser",
            "politician",
            "advocate",
        ],
    },
    tone: {
        type: "checkbox",
        options: [
            "amused",
            "humorous",
            "serious",
            "educational",
            "ironic",
            "judgemental",
            "detached",
            "involved",
            "curious",
            "authoritative",
            "commanding",
            "irreverant",
            "respectful",
        ],
    },
    intent: {
        type: "checkbox",
        options: [
            "inform",
            "persuade",
            "commemorate",
            "honor",
            "expose",
            "defend",
            "attack",
            "discredit",
            "promote",
            "endorse",
            "sell",
            "apologize",
        ],
    },
    audience: {
        type: "radio",
        options: [
            "no one",
            "myself",
            "a single person",
            "several people",
            "many people",
            "everyone",
        ],
    },
};

export { settings, pronouns };
