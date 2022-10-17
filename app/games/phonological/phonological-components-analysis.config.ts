import type { Game } from "~/types";

import ComponentAnalysis from "~/games/phonological/phonological-components-analysis.svelte";

const config:Game = {
    name        : "Component Analysis",
    icon        : "eye",
    description : "Analyze the pictured object.",
    component   : ComponentAnalysis,
    tutorial    : {
        media : {
            type : "image",
            src  : "~/static/eye.png",
        },
        instructions : "Answer questions about the pictured object",
    },
    levels : [
        {
            timeLimit : false,
            subLevels : [
                {
                    timeLimit : false,
                    config    : {
                        object   : "🍎",
                        question : "What sound does the object start with?",
                        options  : [ "K", "B", "A", "Q" ],
                        answer   : "A",
                        format   : "letters",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "🍎",
                        question : "What word starts with the same sound?",
                        options  : [ "Car", "Game", "Play", "Actual" ],
                        answer   : "Actual",
                        format   : "words",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "🍎",
                        question : "What sound does the object end with?",
                        options  : [ "E", "B", "A", "Q" ],
                        answer   : "E",
                        format   : "letters",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "🍎",
                        question : "What word does the object rhyme with?",
                        options  : [ "Lake", "Chapel", "Game", "Motor" ],
                        answer   : "Chapel",
                        format   : "words",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "🍎",
                        question : "How many syllables does the word have?",
                        options  : [ "1", "2", "3", "4" ],
                        answer   : "2",
                        format   : "numbers",
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
                        object   : "🦄",
                        question : "What sound does the object start with?",
                        options  : [ "U", "C", "P", "R" ],
                        answer   : "U",
                        format   : "letters",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "🦄",
                        question : "What word starts with the same sound?",
                        options  : [ "University", "Jelly", "Smite", "Guard" ],
                        answer   : "University",
                        format   : "words",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "🦄",
                        question : "What sound does the object end with?",
                        options  : [ "W", "P", "N", "I" ],
                        answer   : "N",
                        format   : "letters",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "🦄",
                        question : "What word does the object rhyme with?",
                        options  : [ "Loaf", "Ferrari", "Uniform", "Steak" ],
                        answer   : "Uniform",
                        format   : "words",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "🦄",
                        question : "How many syllables does the word have?",
                        options  : [ "1", "2", "3", "4" ],
                        answer   : "3",
                        format   : "numbers",
                    },
                },
               
            ],
            config : {
            },
        },
    ],
};

export default config;
