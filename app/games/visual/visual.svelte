<GameNav game="{game}"/>

<stackLayout class="p-1" >
	<flexboxLayout justifyContent="center" class="py-3">
		{#if successIndex > -1}
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label
				class="p-3 border text-center background-green border-green my-3"
				width="100%"
			>
				<formattedString>
					<span
						text="{level.config.word}"
						class="text text-h1 text-light"
					/>
				</formattedString>
			</label>
		{:else if incorrectIndex > -1}
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label
				class="p-3 border text-center background-orange border-orange my-3"
				width="100%"
			>
				<formattedString>
					<span
						text="Incorrect"
						class="text text-h1 text-light"
					/>
				</formattedString>
			</label>
		{:else}
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label
				class="p-3 border text-center background-gray my-3"
				width="100%"
			>
				<formattedString>
					<span
						text="{level.config.word}"
						class="text text-h1"
					/>
				</formattedString>
			</label>
		{/if}
	</flexboxLayout>
	<flexboxLayout flexWrap="wrap" justifycontent="center">
		{#each level.config.options as card, idx}
			<stackLayout class="p-1" width="49%" height="400px">
				{#if successIndex === idx}
					<flexboxLayout
						class="card border-green background-green border-thick"
						justifyContent="center"
						height="100%"
						on:tap={() => handleCard(card, idx)}
					>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label>
							<formattedString>
								<span text="{card.label}" class="text text-huge" />
							</formattedString>
						</label>	
					</flexboxLayout>
				{:else if incorrectIndex === idx}
					<flexboxLayout
						class="card border-orange background-orange border-thick"
						justifyContent="center"
						height="100%"
						on:tap={() => handleCard(card, idx)}
					>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label>
							<formattedString>
								<span text="{card.label}" class="text text-huge" />
							</formattedString>
						</label>	
					</flexboxLayout>
				{:else}
					<flexboxLayout
						class="card"
						height="100%"
						justifyContent="center"
						on:tap={() => handleCard(card, idx)}
					>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label>
							<formattedString>
								<span text="{card.label}" class="text text-huge" />
							</formattedString>
						</label>	
					</flexboxLayout>
				{/if}
			</stackLayout>
		{/each}
	</flexboxLayout>
</stackLayout>
<script type="ts">
	import { createEventDispatcher } from "svelte";
    import type { GameLevel, Game } from "~/types";

	import GameNav from "~/components/game-nav.svelte";

    export let level:GameLevel;
    export let game:Game;

    let tryagain = false;
	let successIndex:number = -1;
	let incorrectIndex:number = -1;

    const dispatch = createEventDispatcher();

	const handleCard = (card, idx) => {
		if(successIndex > -1 || incorrectIndex > -1) {
			return;
		}

        if(tryagain) {
            tryagain = false;
        }
        
		if(card.value === level.config.word.toLowerCase()) {
			successIndex = idx;

			dispatch("win");
		} else {
			incorrectIndex = idx;

            setTimeout(() => {
				incorrectIndex = -1;
            }, 1000)
		}
	}
</script>