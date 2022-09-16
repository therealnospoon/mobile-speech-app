import type { Game } from "~/types";

import SpeakObject from "~/games/speak-name-the-object/speak-name-the-object.svelte";

const config:Game = {
    name: "Name The Object",
    icon: "speech",
    description: "Say the object's name.",
    component: SpeakObject,
    tutorial: {
        media: {
            type: "image",
            src: "~/static/speech.png",
        },
        instructions: "Say the name of the pictured object.",
    },
    levels: [
        {
            timeLimit: false,
            config: {
                picture : "🎂",
                word    : ["cake"]
            } 
        },
        {
            timeLimit: false,
            config: {
                picture : "🥖",
                word    : ["bread", "loaf", "baguette"]
            } 
        },
        {
            timeLimit: false,
            config: {
                picture : "🎱",
                word    : ["eightball", "eight ball"]
            } 
        },
        {
            timeLimit: false,
            config: {
                picture : "🌅",
                word    : ["sunset", "sun"]
            } 
        },
        {
            timeLimit: false,
            config: {
                picture : "🚑",
                word    : ["ambulance"]
            } 
        },
    ]
}

export default config;