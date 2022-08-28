import { Game } from "~/types";

const GameDefaults:Game = {
    name        : "",
    icon        : "",
    description : "",
    component   : false,
    tutorial    : {
        media : {
            type : "image",
            src  : "",
        },
        instructions : "",
    },
    subLevels: false,
    levels : [
        {
            timeLimit : false,
            config    : {},
        },
    ],
};

export {
    GameDefaults,
};
