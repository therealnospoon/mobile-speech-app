import { writable } from "svelte/store";
import { SpeechRecognition } from "nativescript-speech-recognition";

const createSpeechListener = () => {
    const speechStore = writable("");
  
    const speechRecognition = new SpeechRecognition();

    const resetVoiceStore = () => {
        speechStore.set("");
    };

    const stopListener = async () => {
        await speechRecognition.stopListening();
    };

    const startListener = async () => {
        await speechRecognition.requestPermission();
    
        await speechRecognition.available();
    
        await speechRecognition.startListening(
            {
                // optional, uses the device locale by default
                locale               : "en-US",
                // set to true to get results back continuously
                returnPartialResults : true,
                // this callback will be invoked repeatedly during recognition
                onResult             : (transcription) => {
                    speechStore.set(transcription.text);
                },
                onError : (error) => {
                    console.log(error);

                    if(error !== "No speech detected") {
                        startListener();
                    } else {
                        stopListener();
                    }
                },
            }
        );
    };
  
    return {
        speechStore,
        startSpeechListener : startListener,
        stopSpeechListener  : stopListener,
        clearVoiceStore     : resetVoiceStore,
    };
};

export default createSpeechListener;
