import type { Game } from "~/types";

import SpeakPhrase from "~/games/speak-phrase/speak-phrase.svelte";

const config:Game = {
    name: "Speak The Phrase",
    icon: "speech",
    description: "Say increasingly difficult phrases.",
    component: SpeakPhrase,
    tutorial: {
        media: {
            type: "image",
            src: "~/static/speech.png",
        },
        instructions: "Try your best to say the given phrases completely and accurately.",
    },
    levels: [
        {
            timeLimit: 15,
            config: {
                phrase : "The fox jumps"
            } 
        },
        {
            timeLimit: 15,
            config: {
                phrase : "The fox jumps over the dog"
            } 
        },
        {
            timeLimit: 15,
            config: {
                phrase : "The quick brown fox jumps over the lazy dog"
            } 
        },
    ]
}

export default config;