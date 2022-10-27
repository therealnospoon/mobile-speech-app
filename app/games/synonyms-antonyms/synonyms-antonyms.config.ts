import type { Game } from "~/types";

import SynonymsAntonyms from "~/games/synonyms-antonyms/synonyms-antonyms.svelte";

const config:Game = {
    name        : "Synonyms and antonyms",
    icon        : "speech",
    description : "Identify synonyms and antonyms.",
    component   : SynonymsAntonyms,
    tutorial    : {
        media : {
            type : "image",
            src  : "~/static/speech.png",
        },
        instructions : "Come up a synonym and an antonym for the given word.",
    },
    levels : [
        {
            timeLimit : false,
            subLevels : [
                {
                    timeLimit : false,
                    config    : {
                        word : "Easy",
                        type : "synonym",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        word : "Easy",
                        type : "antonym",
                    },
                },
            ],
            config : {
            },
        },
        {
            timeLimit : false,
            subLevels : [
                {
                    timeLimit : false,
                    config    : {
                        word : "Delicious",
                        type : "synonym",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        word : "Delicious",
                        type : "antonym",
                    },
                },
            ],
            config : {
            },
        },
    ],
};

export default config;
