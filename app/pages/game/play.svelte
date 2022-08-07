<page class="page">

        <svelte:component
            this={game.component}
            level={game.levels[levelIndex]}
            game={game}
            on:win={handleWin}
            on:lose={handleLose}
        />
</page>

<script type="ts">
import { navigate } from 'svelte-native';

import { GameDefaults } from '~/defaults';
import type { Game } from "~/types";

import Win from "~/pages/game/win.svelte";
import Lose from "~/pages/game/win.svelte";
// import GameNav from "~/components/game-nav.svelte";

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
    }, 1000);
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

</script>