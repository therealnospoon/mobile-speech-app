import type { Game } from "~/types";

import PictureAssociation from "~/games/picture-association/picture-association.svelte";

const config:Game = {
    name        : "Picture Association",
    icon        : "eye",
    description : "Choose right picture.",
    component   : PictureAssociation,
    tutorial    : {
        media : {
            type : "image",
            src  : "~/static/eye.png",
        },
        instructions : "Choose the best picture that answers the question",
    },
    levels : [
        {
            timeLimit : false,
            subLevels : [
                {
                    timeLimit : false,
                    config    : {
                        object   : "ππΌββοΈ",
                        question : "Where do you go swimming?",
                        options  : [ "βΊοΈ", "π", "β²οΈ", "π" ],
                        answer   : "π",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "π¬",
                        question : "Who cooks at the restaurant?",
                        options  : [ "π·π»ββοΈ", "π½", "π", "π§π»βπ³" ],
                        answer   : "π§π»βπ³",
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
                        object   : "πΈ",
                        question : "Who plays this instrument?",
                        options  : [ "βΉπ»ββοΈ", "π·π»ββοΈ", "π©πΌβπ€", "π§π»βπ³" ],
                        answer   : "π©πΌβπ€",
                    },
                },
                {
                    timeLimit : false,
                    config    : {
                        object   : "π",
                        question : "Where is this ball thrown?",
                        options  : [ "π₯", "π", "πͺ", "π£" ],
                        answer   : "π",
                    },
                },
            ],
            config : {
            },
        },
       
    ],
};

export default config;
