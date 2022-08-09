<page class="page">
    <actionBar title="{game.name}" color="black"/>

    <stackLayout class="my-2 p-1">
        <flexboxLayout flexDirection="column" class="p-1" alignItems="center">
            <Icon name="warning" size="large" />
    
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label textWrap="{true}">
                <formattedString>   
                    <span text="Incorrect" class="text text-h2" />
                </formattedString>
            </label>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label textWrap="{true}">
                <formattedString>   
                    <span text="Looks like that wasn't quite right, want to try again?" class="text" />
                </formattedString>
            </label>
        </flexboxLayout>

        <flexboxLayout class="p-1" alignItems="center">    
            <button
                text="Exit"
                class="button button-outline my-1"
                width="20%"
                on:tap={exit}
            />

            <button
                text="Next Level"
                class="button my-1"
                width="75%"
                on:tap={tryAgain}
            />
        </flexboxLayout>
    </stackLayout>
</page>

<script type="ts">
import { navigate } from 'svelte-native';

import { GameDefaults } from '~/defaults';
import type { Game } from "~/types";

import Play from "~/pages/game/play.svelte";
import Home from "~/pages/home.svelte";
import Icon from "~/components/icon.svelte";

export let game:Game = GameDefaults;
export let levelIndex:number;

const tryAgain = () => navigate({
    // @ts-ignore
    page: Play,
    clearHistory: true,
    props : {
        game,
        levelIndex: levelIndex,
    }
});

const exit = () => navigate({
    // @ts-ignore
    page: Home,
    clearHistory: true,
});
</script>