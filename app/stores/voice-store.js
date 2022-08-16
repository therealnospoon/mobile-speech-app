import { writable } from "svelte/store";
import { SpeechRecognition } from "nativescript-speech-recognition";

const createSpeechListener = () => {
    const speechStore = writable();
  
    const speechRecognition = new SpeechRecognition;

    const startListener = async () => {
    
        await speechRecognition.requestPermission()
    
        let isReady = false;
       
        isReady = await speechRecognition.available();
    
        await speechRecognition.startListening(
            {
                // optional, uses the device locale by default
                locale: "en-US",
                // set to true to get results back continuously
                returnPartialResults: true,
                // this callback will be invoked repeatedly during recognition
                onResult: (transcription) => {
                    speechStore.set(transcription.text);
                },
                onError: (error) => {
                    console.log(error)
                    startListener();
                }
            }
        );
    }
    
    const stopListener = () => {
        speechRecognition.stopListening();
    }
  
    return {
       speechStore,
       startSpeechListener: startListener,
       stopSpeechListener: stopListener,
    }
}

export default createSpeechListener;