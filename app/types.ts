export interface GameTutorial {
    media: {
        src: string,
        type: "image" | "video",
    },

    instructions: string,
}

export interface GameLevel {
    timeLimit: number | boolean,
    subLevels?: Array<GameLevel>,
    config: Record<string, any>
}

export interface Game {
    name: string,
    icon: string,
    description: string,
    component: any,
    tutorial: GameTutorial,
    levels : Array<GameLevel>
}

export type GamesArray = Array<Game>;
