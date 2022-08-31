import type { Game } from "~/types";

import GameCognitive from "~/games/cognitive/cognitive.svelte";

const config:Game = {
    name: "Cognitive",
    icon: "brain",
    description: "Flip over cards to find pairs.",
    component: GameCognitive,
    tutorial: {
        media: {
            type: "image",
            src: "~/static/brain.png",
        },
        instructions: "Click tiles to flip them over and reveal what's underneath. You can only flip over two tiles at once, and matched pairs will remain flipped over.",
    },
    levels: [
        {
            timeLimit: 15,
            config: {
                cards : [
                    "🚗",
                    "🏀", 
                ]
            } 
        },
        {
            timeLimit: 15,
            config: {
                cards : [
                    "🚗",
                    "🏀", 
                    "🍒",
                ]
            } 
        },
        {
            timeLimit: 15,
            config: {
                cards : [
                    "🚗",
                    "🏀", 
                    "🍒",
                    "🐸",
                ]
            } 
        },
    ]
}

export default config;