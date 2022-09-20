<GameNav game="{game}" />

<stackLayout class="p-1">
    <flexboxLayout justifyContent="center" class="py-3">
        {#if success}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label
                class="p-3 border text-center background-green border-green my-3"
                textWrap="true"
                width="100%"
            >
                <formattedString>
                    <span
                        text="{level.config.phrase}"
                        class="text-h1-light"
                    />
                </formattedString>
            </label>
        {:else if incorrect}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label
                class="p-3 border text-center background-orange border-orange my-3"
                width="100%"
                textWrap="true"
            >
                <formattedString>
                    <span
                        text="Try again"
                        class="text-h1-light"
                    />
                </formattedString>
            </label>
        {:else}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label
                class="p-3 border text-center background-gray my-3"
                width="100%"
                textWrap="true"
            >
                <formattedString>
                    <span
                        text="{level.config.phrase}"
                        class="text text-h1"
                    />
                </formattedString>
            </label>
        {/if}
    </flexboxLayout>

    <Speech on:analyze={analyze} />

</stackLayout>

<script type="ts">
import { createEventDispatcher } from "svelte";

import type { Game, GameLevel } from "~/types";

import GameNav from "~/components/game-nav.svelte";
import Speech from "~/components/speech.svelte";

export let level:GameLevel;
export let game:Game;

let success:boolean  = false;
let incorrect:boolean = false;

const dispatch = createEventDispatcher();

const analyze = ({ detail: capturedAudio }) => {
    if(capturedAudio.toLowerCase() === level.config.phrase.toLowerCase()) {
        success = true;

        dispatch("win");
    } else {
        incorrect = true;

        setTimeout(() => {
            incorrect = false;
        }, 1000);
    }
};
</script>