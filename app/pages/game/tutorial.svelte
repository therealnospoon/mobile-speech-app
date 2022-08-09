<page class="page">
    <actionBar title="How To Play" color="black"/>

    <flexboxLayout flexDirection="column" alignItems="center" class="mt-4 w-100">
		<image src="{game.icon}" class="icon-large p-1 my-4" />

		<stackLayout class="my-2 p-1" width="100%">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label textWrap="{true}">
				<formattedString>
					<span text="{game.name}" class="text text-h2 mt-3" />
				</formattedString>
			</label>
	
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label textWrap="{true}">
				<formattedString>
					<span text="{game.tutorial.instructions}" class="text text-faint" />
				</formattedString>
			</label>

			<button
                text="Start"
                class="button mt-4"
                on:tap={launchGame}
            />
		</stackLayout>
	</flexboxLayout>
</page>

<script type="ts">
import { navigate } from 'svelte-native';

import { GameDefaults } from '~/defaults';
import type { Game } from "~/types";

import Play from "~/pages/game/play.svelte";

export let game:Game = GameDefaults;

const launchGame = () => navigate({
    // @ts-ignore
    page: Play,
	clearHistory: true,
    props : {
        game,
        levelIndex: 0,
    }
});
</script>