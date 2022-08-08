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
                <stackLayout on:tap={exit}>
                    <Icon path="~/static/close.png" size="medium" />
                </stackLayout>
            </flexboxLayout>
        </stackLayout>
    </actionBar>

    <stackLayout class="my-2 p-2">
        <flexboxLayout flexDirection="column" alignItems="center">
            {#if game.levels[levelIndex + 1]}
                <Icon path="~/static/check.png" size="large"  />    
            {:else}
                <Icon path="~/static/party.png" size="large"  />    
            {/if}

            <stackLayout class="my-4 p-1">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                {#if game.levels[levelIndex + 1]}
                    <label textWrap="{true}">
                        <formattedString>   
                            <span text="Level {levelIndex + 1} of {game.levels.length} Complete" class="text text-h2" />
                        </formattedString>
                    </label>
                    <label textWrap="{true}">
                        <formattedString>   
                            <span text="Proceed to the next level to continue the exercise." class="text" />
                        </formattedString>
                    </label>
                {:else}
                    <label>
                        <formattedString>   
                            <span text="Exercise Complete" class="text text-h2" />
                        </formattedString>
                    </label>
                    <label>
                        <formattedString>   
                            <span text="Nice work!" class="text" />
                        </formattedString>
                    </label>
                {/if}
            </stackLayout>
    
            <!-- if there is a next level -->
            {#if game.levels[levelIndex + 1]}
                <button
                    text="Next Level"
                    class="button my-1"
                    width="100%"
                    on:tap={nextLevel}
                />
            {:else}
                <button
                    text="Finish"
                    class="button my-1"
                    width="100%"
                    on:tap={exit}
                />
            {/if}
            <!-- <flexboxLayout alignItems="center" justifyContent="center">    
            </flexboxLayout> -->
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

const nextLevel = () => navigate({
    // @ts-ignore
    page: Play,
    clearHistory: true,
    props : {
        game,
        levelIndex: levelIndex + 1,
    }
});

const exit = () => navigate({
    // @ts-ignore
    page: Home,
    clearHistory: true,
});
</script>