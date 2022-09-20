<stackLayout class="p-2" >
    {#if !isListening}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="animate-fade-in">
            <formattedString>
                <span text="Tap 'Start' to begin..." class="text text-h2" />
            </formattedString>
        </label>
        <textView class="animate-fade-in" >
            <formattedString>
                <span text="{$speechStore}" textWrap={true} class="text text" />
            </formattedString>
        </textView>
    {:else}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="animate-fade-in">
            <formattedString>
                <span text="Listening..." class="text text-h2" />
            </formattedString>
        </label>
        <textView class="animate-fade-in" >
            <formattedString>
                <span text="{$speechStore}" textWrap={true} class="text text" />
            </formattedString>
        </textView>

        <!-- svelte-ignore a11y-label-has-associated-control -->
    {/if}
    <flexboxLayout justifyContent="center">
        <button
            text="{isListening ? 'Submit' : 'Start'}"
            class="button"
            width="50%"
            on:tap={handleTap}
        />
    </flexboxLayout>
</stackLayout>

<script type="ts">
import { createEventDispatcher } from "svelte";
import createSpeechListener from "~/stores/voice-store";

const {
    speechStore,
    startSpeechListener,
    stopSpeechListener,
} = createSpeechListener();

const dispatch = createEventDispatcher();

let isListening = false;

const handleTap = () => {
    if(!isListening) {
        startSpeechListener();
        isListening = true;
    } else {
        stopSpeechListener();
        dispatch("analyze", $speechStore);
        isListening = false;
    }
};
</script>