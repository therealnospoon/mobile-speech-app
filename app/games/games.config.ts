import type { GamesArray } from "~/types";

import Cognitive from "~/games/cognitive/cognitive.config";
import Visual from "~/games/visual/visual.config";
import SpeakPhrase from "~/games/speak-phrase/speak-phrase.config";
import SpeakWord from "~/games/speak-word/speak-word.config";
import SpeakObject from "~/games/speak-name-the-object/speak-name-the-object.config";
import ComponentAnalysis from "~/games/phonological/phonological-components-analysis.config";
import PictureAssociation from "~/games/picture-association/picture-association.config";
import SynonymsAntonyms from "~/games/synonyms-antonyms/synonyms-antonyms.config";
import TouchOrder from "~/games/touch-order/touch-order.config";

const games:GamesArray = [
    Cognitive,
    Visual,
    SpeakPhrase,
    SpeakWord,
    SpeakObject,
    ComponentAnalysis,
    PictureAssociation,
    SynonymsAntonyms,
    TouchOrder,
];

export default games;
