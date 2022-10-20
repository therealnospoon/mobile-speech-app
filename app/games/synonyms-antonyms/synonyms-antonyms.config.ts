import type { Game } from "~/types";

import SynonymsAntonyms from "~/games/synonyms-antonyms/synonyms-antonyms.svelte";

const config:Game = {
    name        : "Synonyms and antonyms",
    icon        : "speech",
    description : "Find synonyms and antonyms.",
    component   : SynonymsAntonyms,
    tutorial    : {
        media : {
            type : "image",
            src  : "~/static/speech.png",
        },
        instructions : "Come up with as many synonyms and antonyms for the given word as possible within a given time limit.",
    },
    levels : [
        {
            timeLimit : false,
            subLevels : [
                {
                    timeLimit : false,
                    config    : {
                        word   : "Easy",
                        type   : "synonyms",
                        target : 3,
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        word   : "Easy",
                        type   : "antonyms",
                        target : 3,
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
                        word   : "Delicious",
                        type   : "synonyms",
                        target : 3,
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        word   : "Delicious",
                        type   : "antonyms",
                        target : 3,
                    },
                },
            ],
            config : {
            },
        },
    ],
};

export default config;
