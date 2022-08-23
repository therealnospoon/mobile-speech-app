import type { GamesArray } from "~/types";

import Cognitive from "~/games/cognitive/cognitive.config";
import Visual from "~/games/visual/visual.config";
import SpeakPhrase from "~/games/speak-phrase/speak-phrase.config";
import SpeakWord from "~/games/speak-word/speak-word.config";

const games:GamesArray = [
    Cognitive,
    Visual,
    SpeakPhrase,
    SpeakWord
];

export default games;
