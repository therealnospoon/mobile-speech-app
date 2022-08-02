<page class="page">
    <actionBar>
        <stackLayout class="px-2 mx-2 mb-4" width="100%">
            <flexboxLayout justifyContent="space-between" width="100%">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>
                    <formattedString>
                        <span text="{game.name}" class="text text-h2" />
                    </formattedString>
                </label>

                {#if !won}
                    <image src="~/static/close.png" width="24" on:tap={handleClose}/>
                {/if}
            </flexboxLayout>
        </stackLayout>
    </actionBar>

    <stackLayout class="my-4 p-1">
        <svelte:component
            this={game.component}
            level={game.levels[levelIndex]}
            on:win={handleWin}
            on:lose={handleLose}
        />
    </stackLayout>
</page>

<script type="ts">
import { navigate } from 'svelte-native';

import { GameDefaults } from '~/defaults';
import type { Game } from "~/types";

import Win from "~/pages/game/win.svelte";
import Lose from "~/pages/game/win.svelte";
import Home from "~/pages/home.svelte";

export let game:Game = GameDefaults;
export let levelIndex:number;

let won = false;

const handleWin = () => {
    won = true;

    setTimeout(() => {
        navigate({
            // @ts-ignore
            page: Win,
            clearHistory: true,
            props : {
                game,
                levelIndex,
            }
        });
    }, 500);
}

const handleLose =  () => navigate({
    // @ts-ignore
    page: Lose,
    clearHistory: true,
    props : {
        game,
        levelIndex,
    }
});

const handleClose = () => {
    navigate({
        // @ts-ignore
        page: Home,
        clearHistory: true,
    });
}
</script>