import type { GamesArray } from "~/types"

import Cognitive from "~/games/cognitive/cognitive.config";
import Visual from "~/games/visual/visual.config";

const games:GamesArray = [
    Cognitive,
    Visual
]

export default games;