<GameNav game="{game}"/>
<dockLayout>
    {#if !incorrect}
    <stackLayout dock="top">
         <!-- svelte-ignore a11y-label-has-associated-control -->
         <label
         class="px-3 animate-fade-in"
         textWrap="true"
         height="33%"
        >
         <formattedString>
             <span
                 text="{level.config.question}"
                 class="text text-h2"
             />
         </formattedString>
        </label>
     </stackLayout>
    
    <stackLayout dock="bottom" >
        <flexboxLayout
            flexWrap="wrap"
            justifyContent="center"
        >
            {#each gameList as card}
                <flexboxLayout
                    class="card m-1"
                    class:card-green={selected.includes(card) && sequence.includes(card)}
                    justifyContent="center"
                    width="46%"
                    height="400px"
                    on:tap={() => handleCard(card)}
                >
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>
                        <formattedString>
                            <span text="{card}" class="text text-huge" />
                        </formattedString>
                    </label>
                </flexboxLayout>
            {/each}
        </flexboxLayout>
    </stackLayout>
    {:else}
    <stackLayout dock="top" height="33%">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="p-3 text-center animate-fade-up"
            textWrap="true"
            dock="top"
        >
            <formattedString>
                <span
                    text={"Sorry, that was incorrect. Please try again."}
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
    {/if}
</dockLayout>

<script type="ts">
import { onMount, createEventDispatcher } from "svelte";

import type { GameLevel, Game } from "~/types";

import shuffleArray from "~/util/shuffle-array";

import GameNav from "~/components/game-nav.svelte";

export let level:GameLevel;
export let game:Game;

const dispatch = createEventDispatcher();

let gameList = [];

let selected = [];
let incorrect:boolean = false;
let sequence;

const reset = () => {
    incorrect = false;
    selected = [];
    gameList = shuffleArray([
        ...level.config.options,
    ]);
};

const handleCard = (picture) => {
    const playerSelectedIndex = selected.push(picture) - 1;

    selected = [ ...selected ];

    if(selected[playerSelectedIndex] !== sequence[playerSelectedIndex]) {
        incorrect = true;

        return;
    }

    if(selected.length === sequence.length) {
        setTimeout(() => {
            selected = [];
            dispatch("win");
        }, 1000);
    }
};

const tryAgain = () => {
    reset();
    incorrect = false;
};

onMount(() => {
    reset();

    sequence = level.config.sequence;
});
</script>