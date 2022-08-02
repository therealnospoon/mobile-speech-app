<page class="page">
	<actionBar title="Cognitive" style="text" color="black"/>

	<stackLayout class="p-1" >
		<flexboxLayout
			flexWrap="wrap"
			justifyContent="center"
		>
			{#each gameList as card, idx}
				<flexboxLayout
					class="border m-1"
					class:animate-flip={revealed.includes(idx) || matched.includes(card)}
					class:border-green={matched.includes(card)}
					class:border-thick={matched.includes(card)}
					justifyContent="center"
					width="46%"
					height="400px"
					on:tap={() => handleCard(card, idx)}
				>
					{#if revealed.includes(idx) || matched.includes(card)}
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="animate-fade-in">
							<formattedString>
								<span text="{card}" class="text text-huge" />
							</formattedString>
						</label>
					{/if}
				</flexboxLayout>
			{/each}
		</flexboxLayout>
	</stackLayout>
</page>

<script type="ts">
import { onMount, createEventDispatcher } from "svelte";

import type { GameLevel } from "~/types";

import shuffleArray from "~/util/shuffle-array";

export let level:GameLevel;

const dispatch = createEventDispatcher();

let gameList = [];

let revealed = [];
let matched = [];

const reset = () => {
	matched = [];
	revealed = [];
	gameList = shuffleArray([
		...level.config.cards,
		...level.config.cards
	]);
}

const handleCard = (card, idx) => {
	if(revealed.length < 2) {
		revealed = [
			...revealed,
			idx,
		]

		const [
			firstIndex,
			secondIndex,
		] = revealed;

		if(gameList[firstIndex] === gameList[secondIndex]) {
			matched = [
				...matched,
				card,
			]

			revealed = [];
		}
	} else if(revealed.length === 2) {
		revealed = [ idx ];
	}

	// If all matched
	if(level.config.cards.every((card) => matched.includes(card))) {
		dispatch("win");
	}
}

onMount(reset);
</script>