<GameNav game="{game}" />

<stackLayout class="p-1">
    <flexboxLayout justifyContent="center">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="p-3 text-center my-1"
            width="100%"
        >
            <formattedString>
                <span
                    text="Question {subLevelIndex + 1} of {subLevels.length}"
                    class="text text-h3"
                />
            </formattedString>
        </label>
    </flexboxLayout>
    <flexboxLayout justifyContent="center" class="py-3">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="p-3 my-1"
            width="100%"
            textWrap="true"
        >
            <formattedString>
                <span
                    text="{subLevels[subLevelIndex].question}"
                    class="text text-h2"
                />
            </formattedString>
        </label>
    </flexboxLayout>
    <flexboxLayout justifyContent="center" class="py-1 animate-fade-in">
		{#if successIndex > -1}
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label
				class="p-3 border text-center background-green border-green my-3"
				width="100%"
                height="300px"
			>
				<formattedString>
					<span
						text="Correct!"
						class="text text-h1 text-light"
					/>
				</formattedString>
			</label>
		{:else if incorrectIndex > -1}
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label
				class="p-3 border text-center background-orange border-orange my-3"
				width="100%"
                height="300px"
			>
				<formattedString>
					<span
						text="Try again"
						class="text text-h1 text-light"
					/>
				</formattedString>
			</label>
		{:else}
            <!-- svelte-ignore a11y-label-has-associated-control -->
			<label
				class="p-3 border text-center background-gray my-3"
				width="100%"
                height="300px"
			>
                <formattedString>
					<span
						text="{level.config.object}"
						class="text text-huge"
					/>
				</formattedString>
			</label>
		{/if}
	</flexboxLayout>
	<flexboxLayout flexWrap="wrap" justifycontent="center">
		{#each subLevels[subLevelIndex].options as card, idx}
            {#if subLevels[subLevelIndex].format !== "words"}
                <stackLayout class="p-1 animate-fade-up" width="49%" height="400px">
                    <flexboxLayout
                        class="card"
                        class:border-thick={successIndex === idx || incorrectIndex === idx}
                        class:border-green={successIndex === idx}
                        class:border-orange={incorrectIndex === idx}
                        height="100%"
                        justifyContent="center"
                        on:tap={() => handleCard(card, idx)}
                    >
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>
                            <formattedString>
                                <span text="{card}" class="text text-h1" />
                            </formattedString>
                        </label>	
                    </flexboxLayout>
                </stackLayout>
            {:else}
                <stackLayout class="p-1 animate-fade-up" width="100%" height="200px">
                    <flexboxLayout
                        class="card"
                        class:border-thick={successIndex === idx || incorrectIndex === idx}
                        class:border-green={successIndex === idx}
                        class:border-orange={incorrectIndex === idx}
                        height="100%"
                        justifyContent="center"
                        on:tap={() => handleCard(card, idx)}
                    >
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>
                            <formattedString>
                                <span text="{card}" class="text text-h2" />
                            </formattedString>
                        </label>	
                    </flexboxLayout>
                </stackLayout>
            {/if}
		{/each}
	</flexboxLayout>
</stackLayout>

<script type="ts">
import { createEventDispatcher } from "svelte";

import type { Game, GameLevel } from "~/types";

import GameNav from '~/components/game-nav.svelte';

export let level:GameLevel;
export let subLevels = [];

export let game:Game;

let subLevelIndex = 0;

let successIndex:number = -1;
let incorrectIndex:number = -1;

    const dispatch = createEventDispatcher();

	const handleCard = (card, idx) => {
		if(successIndex > -1 || incorrectIndex > -1) {
			return;
		}

		if(card === subLevels[subLevelIndex].answer) {
			successIndex = idx;

            if(subLevels[subLevelIndex + 1]) {
                setTimeout(() => {
                    subLevelIndex += 1;
                    successIndex = -1;
                }, 1000)
            } else {
                dispatch("win");
            }

		} else {
			incorrectIndex = idx;

            setTimeout(() => {
				incorrectIndex = -1;
            }, 1000)
		}
	}
</script>