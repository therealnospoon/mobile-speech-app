import type { Game } from "~/types";

import FaceTrack from "~/games/face-tracking/face-tracking.svelte";

const config:Game = {
    name: "Face Tracking",
    icon: "eye",
    description: "Trying to track faces",
    component: FaceTrack,
    tutorial: {
        media: {
            type: "image",
            src: "~/static/eye.png",
        },
        instructions: "Testing out face tracking capabilities with AR",
    },
    levels: [
        {
            timeLimit: 15,
            config: {
                word : "Ball"
            } 
        },
        {
            timeLimit: 15,
            config: {
                word : "Songs"
            } 
        },
        {
            timeLimit: 15,
            config: {
                word : "Umbrella"
            } 
        },
    ]
}

export default config;