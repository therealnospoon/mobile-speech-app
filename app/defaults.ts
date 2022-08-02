import { Game } from "~/types"

const GameDefaults:Game = {
    name: "",
    icon: "",
    description: "",
    component: false,
    tutorial: {
        media: {
            type: "image",
            src: "",
        },
        instructions: "",
    },
    levels: [
        {
            timeLimit: false,
            config: {} 
        },
    ]
}

export {
    GameDefaults
}