import type { GamesArray } from "~/types";

import Cognitive from "~/games/cognitive/cognitive.config";
import Visual from "~/games/visual/visual.config";
import Speech from "~/games/speech/speech.config";

const games:GamesArray = [
    Cognitive,
    Visual,
    Speech,
];

export default games;
