<GameNav game="{game}" />
<dockLayout>
    {#if success}
        <stackLayout dock="top" height="33%">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label
                class="p-3 text-center animate-fade-up"
                textWrap="true"
            >
                <formattedString>
                    <span
                        text={`Correct! ${correctAnswer} is ${level.config.type === "synonym" ? "a" : "an"} ${level.config.type} of ${level.config.word}. Tap next to proceed.`}
                        class="text-h2"
                    />
                </formattedString>
            </label>
            <button
                text={"Next"}
                class="button mt-3"
                on:tap={proceed}
                width="50%"
            />
        </stackLayout>
    {:else if incorrect}
    <stackLayout dock="top" height="33%">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="p-3 text-center animate-fade-up"
            textWrap="true"
            dock="top"
        >
            <formattedString>
                <span
                    text={`${playerAnswer} is not ${level.config.type === "synonym" ? "a" : "an"} ${level.config.type} of ${level.config.word}. Please try again.`}
                    class="text-h2"
                />
            </formattedString>
        </label>
        <button
            text={"Try again"}
            class="button mt-3"
            on:tap={tryAgain}
            width="50%"
        />
    </stackLayout>
    {:else if overLimit}
    <stackLayout dock="top" height="33%">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="p-3 text-center animate-fade-up"
            textWrap="true"
            dock="top"
        >
            <formattedString>
                <span
                    text={`Too many words. Please only submit one ${level.config.type}.`}
                    class="text-h2"
                />
            </formattedString>
        </label>
        <button
            text={"Okay"}
            class="button mt-3"
            on:tap={tryAgain}
            width="50%"
        />
    </stackLayout>
    {:else if noInput}
    <stackLayout dock="top" height="33%">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="p-3 text-center animate-fade-up"
            textWrap="true"
            dock="top"
        >
            <formattedString>
                <span
                    text={"No input detected. Please try again."}
                    class="text-h2"
                />
            </formattedString>
        </label>
        <button
            text={"Try again"}
            class="button mt-3"
            on:tap={tryAgain}
            width="50%"
        />
    </stackLayout>
    {:else}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="px-3 animate-fade-in"
            textWrap="true"
            height="33%"
            dock="top"
        >
            <formattedString>'
                <span
                    text="Tap 'Start' and then say {level.config.type === "synonym" ? 'a' : 'an'} {level.config.type} for the word below and then tap 'Submit' when ready"
                    class="text text-h2"
                />
            </formattedString>
        </label>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="text-center mx-3 animate-fade-in"
            height="25%"
            textWrap="true"
            dock="top"
        >
            <formattedString>
                <span
                    text="{level.config.word}"
                    class="text text-huge"
                />
            </formattedString>
        </label>
        <stackLayout dock="bottom" height="33%">
            <Speech on:analyze={analyze}/>
        </stackLayout>
    {/if}
    </dockLayout>

<script type="ts">
import { Http } from "@nativescript/core";
import { createEventDispatcher } from "svelte";

import type { Game, GameLevel } from "~/types";

import GameNav from "~/components/game-nav.svelte";
import Speech from "~/components/speech.svelte";

export let level:GameLevel;
export let game:Game;

const dispatch = createEventDispatcher();

let success:boolean  = false;
let incorrect:boolean = false;
let overLimit:boolean = false;
let noInput:boolean = false;

let correctAnswer = "";
let playerAnswer = "";

const getResults = async () => {
    const results = await Http.getJSON(`${process.env.WEBSTER_API}/references/thesaurus/json/${level.config.word}?key=${process.env.WEBSTER_KEYS}`).then((wordObject) => {
        if(level.config.type === "antonym") {
            return wordObject[0].meta.ants.flat();
        }

        return wordObject[0].meta.syns.flat();
    });

    return results;
};

const tryAgain = () => {
    if(incorrect === true) {
        incorrect = false;
    } else if(overLimit === true) {
        overLimit = false;
    } else {
        noInput = false;
    }

    correctAnswer = "";
    playerAnswer = "";
};

const proceed = () => {
    dispatch("win");
};

const analyze = async ({ detail: capturedAudio }) => {
    const userWords = capturedAudio.split(" ");

    if(userWords.length > 1) {
        overLimit = true;
    } else {
        const lowerCasedWord = userWords[0].toLowerCase();

        if(lowerCasedWord) {
            const validationArray = await getResults();
            
            if(validationArray.includes(lowerCasedWord)) {
                correctAnswer = userWords;
                success = true;
            } else {
                playerAnswer = userWords;
                incorrect = true;
            }
        } else {
            noInput = true;
        }
    }
};
</script>