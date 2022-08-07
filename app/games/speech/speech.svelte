<GameNav game="{game}" onClose="{stopListener}" />
<stackLayout class="p-2" >
    {#if !isReady}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="animate-fade-in">
            <formattedString>
                <span text="Loading.." class="text" />
            </formattedString>
        </label>
    {:else}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="animate-fade-in">
            <formattedString>
                <span text="Listening..." class="text text-h2" />
            </formattedString>
        </label>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <textView class="animate-fade-in" >
            <formattedString>
                <span text="{result}" textWrap={true} class="text text" />
            </formattedString>
        </textView>
    {/if}
</stackLayout>

<script type="ts">
import { onMount, createEventDispatcher } from "svelte";

import { SpeechRecognitionTranscription, SpeechRecognition } from "nativescript-speech-recognition";

import type { Game, GameLevel } from "~/types";

import GameNav from '~/components/game-nav.svelte';

export let level:GameLevel;
export let game:Game;

const dispatch = createEventDispatcher();

let speechRecognition = new SpeechRecognition();

let isReady = false;
let isListening = false;
let result = "";

const restartListener = async () => {
    speechRecognition = new SpeechRecognition();

    await speechRecognition.requestPermission()

    isReady = await speechRecognition.available();

    isListening = true;

    await speechRecognition.startListening(
        {
            // optional, uses the device locale by default
            locale: "en-US",
            // set to true to get results back continuously
            returnPartialResults: true,
            // this callback will be invoked repeatedly during recognition
            onResult: (transcription: SpeechRecognitionTranscription) => {
                result = transcription.text;
            },
            onError: (error: string | number) => {
                console.log(error)
                restartListener();
            }
        }
    );
}

const stopListener = () => {
    speechRecognition.stopListening();
}

onMount(async () => {
    try {
        restartListener();
    } catch (error) {
        console.log(error);
    }
});
</script>