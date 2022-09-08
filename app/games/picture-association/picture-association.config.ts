import type { Game } from "~/types";

import PictureAssociation from "~/games/picture-association/picture-association.svelte";

const config:Game = {
    name: "Picture Association",
    icon: "eye",
    description: "Choose the pictures to answer questions.",
    component: PictureAssociation,
    tutorial: {
        media: {
            type: "image",
            src: "~/static/eye.png",
        },
        instructions: "Choose the best picture that answers the question",
    },
    levels: [
        {
            timeLimit: false,
            subLevels: [
                {
                    timeLimit: false,
                    config: {
                        object : "🏊🏼‍♀️",
                        question : "Where do you go swimming?",
                        options : ["⛺️", "🌅", "⛲️", "🏞"], 
                        answer: "🌅",
                    }
                },
                {
                    timeLimit: false,
                    config: {
                        object : "🏬",
                        question : "Who cooks at the restaurant?",
                        options : ["👷🏻‍♀️", "👽", "🏂", "🧑🏻‍🍳"], 
                        answer: "🧑🏻‍🍳",
                    }
                }, 
            ],
            config: {
            } 
        },
        {
            timeLimit: false,
            subLevels: [
                {
                    timeLimit: false,
                    config: {
                        object : "🎸",
                        question : "Who plays this instrument?",
                        options : ["⛹🏻‍♀️", "👷🏻‍♀️", "👩🏼‍🎤", "🧑🏻‍🍳"], 
                        answer: "👩🏼‍🎤",
                    }
                },
                {
                    timeLimit: false,
                    config: {
                        object : "🏈",
                        question : "Where is this ball thrown?",
                        options : ["🏥", "🏟", "🪐", "🛣"], 
                        answer: "🏟",
                    }
                }, 
            ],
            config: {
            } 
        },
       
    ]
}

export default config;