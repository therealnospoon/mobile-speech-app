<page class="page">
	<actionBar class="background-light">
		<flexboxLayout class="w-100 px-1" justifyContent="space-between" alignItems="center">
			<image src="~/static/logo-dark.png" width="85px" />
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label textWrap="{true}">
				<formattedString>
					<span text="Speak2Me" class="text text-bold" />
				</formattedString>
			</label>
			<image src="~/static/settings.png" width="75px" />
		</flexboxLayout>
	</actionBar>

	<stackLayout class="mt-4 animate-fade-up">
		{#each gamesConfig as game}
			<flexboxLayout
				class="card my-2"
				neumorphism="flat"
				fillColor="#ffffff"
				lightShadowColor="#ffffff"
				darkShadowColor="#bebfc1"
				cornerRadius="10"	
				on:tap={() => navigate({
					page  : Tutorial,
					props : {
						game,
					},
				})}
			>
				<Icon name="{game.icon}" size="medium" />

				<stackLayout class="ml-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label textWrap="{true}">
						<formattedString>
							<span text="{game.name}" textWrap="{true}" class="text text-h3" />
						</formattedString>
					</label>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label>
						<formattedString>
							<span text="{game.description}" textWrap="{true}" class="text text-faint mr-1" />
						</formattedString>
					</label>
				</stackLayout>
			</flexboxLayout>
		{/each}
		<flexboxLayout
			class="card mt-2"
			neumorphism="flat"
			fillColor="#ffffff"
			lightShadowColor="#ffffff"
			darkShadowColor="#bebfc1"
			cornerRadius="10"
		>
			<stackLayout class="w-100">
				<flexboxLayout justifycontent="py-4 w-100">
					<image src="~/static/jane-doe.png" width="65"/>
					
					<stackLayout class="ml-3">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label textWrap="{true}">
							<formattedString>
								<span text="Dr. Jane Doe" textWrap="{true}" class="text text-h2" />
							</formattedString>
						</label>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label textWrap="{true}">
							<formattedString>
								<span text="Feel free to contact me with any questions." textWrap="{true}" class="text" />
							</formattedString>
						</label>
					</stackLayout>
				</flexboxLayout>
				<stackLayout class="w-100 pt-2">
					<flexboxLayout justifycontent="space-between w-100">
						<button
							text="Call"
							class="button"
							width="30%"
						/>
						<button
							text="Text"
							class="button mx-3"
							width="30%"
						/>
						<button
							text="Email"
							class="button"
							width="30%"
						/>
					</flexboxLayout>
				</stackLayout>
			</stackLayout>
		</flexboxLayout>
	</stackLayout>
</page>

<script>
	import { navigate } from "svelte-native";

	import gamesConfig from "~/games/games.config";

	import Tutorial from "~/pages/game/tutorial.svelte";

	import Icon from "~/components/icon.svelte";
</script>

