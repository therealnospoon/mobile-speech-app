<page class="page">
    <actionBar title="{name}" style="text" color="black"/>

    <flexboxLayout flexDirection="column" class="p-1">
		<Icon path="{icon}" size="large" customClass="my-2" />

		<stackLayout class="my-2 p-1">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label textWrap="{true}">
				<formattedString>
					<span text="{name}" class="text text-h2" />
				</formattedString>
			</label>
	
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label textWrap="{true}">
				<formattedString>
					<span text="{tutorial.instructions}" class="text text-faint my-2" />
				</formattedString>
			</label>

			<button text="Start" class="button my-1" on:tap={launchGame} />
		</stackLayout>
	</flexboxLayout>
</page>

<script type="ts">
import { navigate } from 'svelte-native';

import { GameDefaults } from '~/defaults';
import type { Game } from "~/types";

import Icon from "~/components/icon.svelte";

export let game:Game;

const launchGame = () => navigate({
    page: component,
    props: {
        config : game,
		levelIndex : 0,
    }
});

$: ({
    name,
    icon,
    tutorial,
    component,
} = game || GameDefaults);
</script>