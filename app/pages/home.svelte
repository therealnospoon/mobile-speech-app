<page class="page">
	<actionBar title="Speak2Me" style="text" color="black"/>

	<stackLayout class="p-1">
		<Nav />

		{#each gamesConfig as game}
			<flexboxLayout class="card my-2" on:tap={() => navigate({
				page: Tutorial,
				props : {
					game,
				}
			})}>
				<image src="{game.icon}" class="icon p-1" />
				<stackLayout class="ml-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label textWrap="{true}">
						<formattedString>
							<span text="{game.name}" textWrap="{true}" class="text text-h2" />
						</formattedString>
					</label>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label textWrap="{true}">
						<formattedString>
							<span text="{game.description}" textWrap="{true}" class="text text-faint mr-1" />
						</formattedString>
					</label>
				</stackLayout>
			</flexboxLayout>
		{/each}
	</stackLayout>
</page>

<script>
	import { navigate } from 'svelte-native';

	import gamesConfig from "~/games/games.config";
	
	import Nav from "~/components/top-nav.svelte";
	import Tutorial from "~/pages/game/tutorial.svelte";
</script>