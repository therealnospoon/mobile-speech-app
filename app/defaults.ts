import { Game, GameLevel } from "~/types";

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
    levels : [
        {
            timeLimit : false,
            subLevels : [],
            config    : {},
        },
    ],
};

export {
    GameDefaults,
};
