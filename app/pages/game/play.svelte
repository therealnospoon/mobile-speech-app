<page class="page">
    <svelte:component
        this={game.component}
        level={subLevelsExist ? game.levels[levelIndex].config.subLevels[subLevelIndex] : game.levels[levelIndex]}
        levelIndex={levelIndex}
        subLevelIndex={subLevelIndex || null}
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
import Play from "~/pages/game/play.svelte";

export let game:Game = GameDefaults;
export let levelIndex:number;
export let subLevelIndex:number;

let subLevelsExist:boolean = game.levels[levelIndex].config.subLevels ? true : false;

let won = false;

const handleWin = () => {
    won = true;

    //Checks if this event should increment the subLevelIndex and navigate back to Play with new subLevelIndex or to invoke Win component to move to the next levelIndex
    if(subLevelsExist && game.levels[levelIndex].config.subLevels[subLevelIndex + 1]) {
        setTimeout(() => {
            navigate({
                // @ts-ignore
                page: Play,
                clearHistory: true,
                props : {
                    game,
                    levelIndex,
                    subLevelIndex: subLevelIndex + 1
                }
            });
        }, 1000);
    } else {
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