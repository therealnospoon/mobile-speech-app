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
                        text={`You got ${correctAnswers.length} ${level.config.type}. Nice job!`}
                        class="text-h2"
                    />
                </formattedString>
            </label>
            <button
                text={"Next"}
                class="button mt-3 animate-fade-in"
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
                    text={`You got ${correctAnswers.length} ${level.config.type} correct. Answer ${level.config.target} correctly to move on`}
                    class="text-h2"
                />
            </formattedString>
        </label>
        <button
            text={"Try again"}
            class="button mt-3 animate-fade-in"
            on:tap={tryAgain}
            width="50%"
        />
    </stackLayout>
    {:else}
        {#if !isTimerRunning}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="px-3 animate-fade-in"
            textWrap="true"
            height="33%"
            dock="top"
        >
            <formattedString>
                <span
                    text="Tap start and then say as many {level.config.type} for the word below as you can"
                    class="text text-h2"
                />
            </formattedString>
        </label>
        {:else}
        <stackLayout height="33%" dock="top" class="p-4">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label
                    class="timer animate-fade-in text-center"
                    bind:this={timerClock}
            >
                <formattedString>
                    <span
                        text={`${timeleft}`}
                        class="text text-huge"
                        bind:this={timerText}
                    />
                </formattedString>
            </label>
        </stackLayout>
        {/if}
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
            <Speech 
                on:analyze={analyze}
                on:startTimer={startTimer}
                on:stopTimer={stopTimer}
                on:cancel={cancel}
                timeLimit={10}
                buttonText={"Start timer"}
            />
        </stackLayout>
    {/if}
    </dockLayout>

<script type="ts">
import { Color, Http } from "@nativescript/core";
import { createEventDispatcher } from "svelte";

import type { Game, GameLevel } from "~/types";
import {
    animate, animateColor, JsColorAnimationDefinition, JsAnimationDefinition, AnimationColorRange
} from "~/util/animation-helpers";
import * as d3 from "d3-ease";

import GameNav from "~/components/game-nav.svelte";
import Speech from "~/components/speech.svelte";

export let level:GameLevel;
export let game:Game;

const dispatch = createEventDispatcher();

let success:boolean  = false;
let incorrect:boolean = false;
let isTimerRunning:boolean = false;
let timerCaution:boolean = false;
let timerAlert:boolean = false;

let timerClock;
let timerText;
let timerID;

let correctAnswers = [];

const def1: JsAnimationDefinition = {
    getRange : () => ({ from : 100, to : 125 }),
    curve    : d3.easeBounceOut,
    step     : (v) => {
        timerClock.nativeView.height = v;
    },
};

const def2: JsAnimationDefinition = {
    getRange : () => ({ from : 100, to : 125 }),
    curve    : d3.easeBounceOut,
    step     : (v) => {
        timerClock.nativeView.width = v;
    },
};

const warningColor = new Color(255, 255, 124, 0);
const alertColor = new Color(255, 255, 39, 0);

const defWarn: JsColorAnimationDefinition = {
    
    curve    : (t) => t,
    getRange : () => {
        const r: AnimationColorRange = {
            range_R : { from : timerText.nativeView.color.r, to : warningColor.r },
            range_G : { from : timerText.nativeView.color.g, to : warningColor.g },
            range_B : { from : timerText.nativeView.color.b, to : warningColor.b },
        };
        
        return r;
    },
    step : (r, g, b) => {
        timerText.nativeView.color = new Color(255, r, g, b);
    },
};

const defAlert: JsColorAnimationDefinition = {
    
    curve    : (t) => t,
    getRange : () => {
        const r: AnimationColorRange = {
            range_R : { from : timerText.nativeView.color.r, to : alertColor.r },
            range_G : { from : timerText.nativeView.color.g, to : alertColor.g },
            range_B : { from : timerText.nativeView.color.b, to : alertColor.b },
        };
        
        return r;
    },
    step : (r, g, b) => {
        timerText.nativeView.color = new Color(255, r, g, b);
    },
};

const getResults = async () => {
    const results = await Http.getJSON(`${process.env.WEBSTER_API}/references/thesaurus/json/${level.config.word}?key=${process.env.WEBSTER_KEYS}`).then((wordObject) => {
        if(level.config.type === "antonyms") {
            return wordObject[0].meta.ants.flat();
        }

        return wordObject[0].meta.syns.flat();
    });

    return results;
};

const stopTimer = () => {
    clearInterval(timerID);
    isTimerRunning = false;
};

const startTimer = ({ detail: handleSubmit }) => {
    animate(2000, [ def1, def2 ]);

    isTimerRunning = true;
    timeleft = 10;

    timerID = setInterval(() => {
        timeleft -= 1;
            
        if(timeleft <= 0) {
            stopTimer();
            handleSubmit();
        }
    }, 1000);
};

const tryAgain = () => {
    incorrect = false;
    // Reset correct answers array
    correctAnswers = [];
};

const proceed = () => {
    dispatch("win");
};

const cancel = () => {
    stopTimer();
    // Reset correct answers array
    correctAnswers = [];
};

const analyze = async ({ detail: capturedAudio }) => {
    const userWords = capturedAudio.split(" ");

    if(userWords.length > 0) {
        const validationArray = await getResults();
    
        userWords.forEach((word) => {
            if(validationArray.includes(word.toLowerCase())) {
                correctAnswers.push(word);
            }
        });
    
        if(correctAnswers.length >= level.config.target) {
            success = true;
        } else {
            incorrect = true;
        }
    } else {
        incorrect = true;
    }
};

$: timeleft = 10;

$: if(timeleft <= 5 && timeleft > 3) {
    timerCaution = true;
} else {
    timerCaution = false;
}

$: if(timeleft <= 3 && timeleft > 0) {
    timerCaution = false;
    timerAlert = true;
} else {
    timerAlert = false;
}

$: if(timerCaution) {
    animateColor(500, [ defWarn ]);
}

$: if(timerAlert) {
    animateColor(500, [ defAlert ]);
}
</script>