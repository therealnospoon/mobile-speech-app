import type { Game } from "~/types";

import Speech from "~/games/speech/speech.svelte";

const config:Game = {
    name: "Speak",
    icon: "~/static/speech.png",
    description: "Say words as they appear.",
    component: Speech,
    tutorial: {
        media: {
            type: "image",
            src: "~/static/speech.png",
        },
        instructions: "Say words as they appear on the screen.",
    },
    levels: [
        {
            timeLimit: 15,
            config: {} 
        },
    ]
}

export default config;