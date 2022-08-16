<GameNav game="{game}" onClose="{stopSpeechListener}" />
<stackLayout class="p-2" >
    {#if !isListening}
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
                <span text="{$speechStore}" textWrap={true} class="text text" />
            </formattedString>
        </textView>
    {/if}
</stackLayout>

<script type="ts">
import { onMount } from "svelte";

import createSpeechListener from "~/stores/voice-store";

import type { Game, GameLevel } from "~/types";

import GameNav from '~/components/game-nav.svelte';

export let level:GameLevel;
export let game:Game;

const {
  speechStore,
  startSpeechListener,
  stopSpeechListener,
} = createSpeechListener()

let isListening = false;

onMount(() => {
    try {
        startSpeechListener();
        isListening = true;
    } catch (error) {
        console.log(error);
    }
});
</script>