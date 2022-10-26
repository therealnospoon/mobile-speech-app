import type { Game } from "~/types";

import TouchOrder from "~/games/touch-order/touch-order.svelte";

const config:Game = {
    name        : "Touch Order",
    icon        : "eye",
    description : "Pick images based on order.",
    component   : TouchOrder,
    tutorial    : {
        media : {
            type : "image",
            src  : "~/static/eye.png",
        },
        instructions : "Touch the images in the order specified by the instructions",
    },
    levels : [
        {
            timeLimit : false,
            config    : {
                question : "First touch the tennis ball, then the balloon.",
                options  : [ "🎾", "🎈", "🍎", "🏠" ],
                sequence : [ "🎾", "🎈" ],
            },
        },
        {
            timeLimit : false,
            config    : {
                question : "Touch the snowboarder, then the chef, and then the alien",
                options  : [ "👷🏻‍♀️", "👽", "🏂", "🧑🏻‍🍳" ],
                sequence : [ "🏂", "🧑🏻‍🍳", "👽" ],
            },
        },
    ],
};

export default config;
