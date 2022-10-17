import type { Game } from "~/types";

import SpeakWord from "~/games/speak-word/speak-word.svelte";

const config:Game = {
    name        : "Say The Word",
    icon        : "speech",
    description : "Say increasingly difficult words.",
    component   : SpeakWord,
    tutorial    : {
        media : {
            type : "image",
            src  : "~/static/speech.png",
        },
        instructions : "Try your best to say the given word as accurately as possible.",
    },
    levels : [
        {
            timeLimit : 15,
            config    : {
                word : "Ball",
            },
        },
        {
            timeLimit : 15,
            config    : {
                word : "Songs",
            },
        },
        {
            timeLimit : 15,
            config    : {
                word : "Umbrella",
            },
        },
    ],
};

export default config;
