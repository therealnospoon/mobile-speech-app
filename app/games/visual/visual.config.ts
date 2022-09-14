import type { Game } from "~/types";

import GameVisual from "~/games/visual/visual.svelte";

const config:Game = {
    name: "Visual",
    icon: "eye",
    description: "Match images with words.",
    component: GameVisual,
    tutorial: {
        media: {
            type: "image",
            src: "~/static/eye.png",
        },
        instructions: "Match the image with the corresponding word and image above.",
    },
    levels: [
        {
            timeLimit: false,
            config: {
                word : "Apple",
                options: [
                    {
                        label : "🎱",
                        value : "eightball", 
                    },
                    {
                        label : "🥎",
                        value : "tennis ball",
                    },
                    {
                        label : "🍎",
                        value : "apple", 
                    },
                    {
                        label : "🍕",
                        value : "pizza", 
                    },
                ]
            } 
        },
        {
            timeLimit: false,
            config: {
                word : "Eightball",
                options: [
                    {
                        label : "🎱",
                        value : "eightball", 
                    },
                    {
                        label : "🥎",
                        value : "tennis ball", 
                    },
                    {
                        label : "🍎",
                        value : "apple", 
                    },
                    {
                        label : "🍕",
                        value : "pizza", 
                    },
                ]
            } 
        },
        {
            timeLimit: false,
            config: {
                word : "Pizza",
                options: [
                    {
                        label : "🎱",
                        value : "eightball", 
                    },
                    {
                        label : "🥎",
                        value : "tennis ball", 
                    },
                    {
                        label : "🍎",
                        value : "apple", 
                    },
                    {
                        label : "🍕",
                        value : "pizza", 
                    },
                ]
            } 
        },
    ]
}

export default config;