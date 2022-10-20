<stackLayout class="p-2" >
    {#if !isListening}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="animate-fade-in" width="100%">
            <formattedString>
                <span text="Tap 'Start' to begin..." class="text text-h2" />
            </formattedString>
        </label>
        <textView class="animate-fade-in" >
            <formattedString>
                <span text="{$speechStore}" textWrap={true} class="text" />
            </formattedString>
        </textView>
    {:else}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="animate-fade-in" width="100%">
            <formattedString>
                <span text="Listening..." class="text text-h2" />
            </formattedString>
        </label>
        <textView class="animate-fade-in" >
            <formattedString>
                <span text="{$speechStore}" textWrap={true} class="text" />
            </formattedString>
        </textView>

        <!-- svelte-ignore a11y-label-has-associated-control -->
    {/if}
    <flexboxLayout justifyContent="center">
        {#if !isTimerRunning}
            {#if !isListening}
            <button
                text={`${buttonText}`}
                class="button"
                width="50%"
                on:tap={handleStart}
            />
            {:else}
            <button
                text={"Submit"}
                class="button"
                width="50%"
                on:tap={handleSubmit}
            />
            {/if}
        {:else}
        <button
            text={"Cancel"}
            class="button"
            width="50%"
            on:tap={handleCancel}
        />
        {/if}
    </flexboxLayout>
</stackLayout>

<script type="ts">
import { createEventDispatcher } from "svelte";
import createSpeechListener from "~/stores/voice-store";

export let buttonText = "Start";
export let timeLimit = 0;

const {
    speechStore,
    startSpeechListener,
    stopSpeechListener,
    clearVoiceStore,
} = createSpeechListener();

const dispatch = createEventDispatcher();

let isListening = false;

let isTimerRunning = false;

const handleCancel = async () => {
    await stopSpeechListener();
    dispatch("cancel");
    isListening = false;
    isTimerRunning = false;
    clearVoiceStore();
};

const handleSubmit = async () => {
    await stopSpeechListener();
 
    dispatch("analyze", $speechStore);
    isListening = false;
    isTimerRunning = false;
};

const handleStart = () => {
    clearVoiceStore();

    if(timeLimit >= 1) {
        startSpeechListener();
        isListening = true;
        isTimerRunning = true;
        dispatch("startTimer", handleSubmit);
    } else {
        startSpeechListener();
        isListening = true;
    }
};
</script>