<actionBar>
    <stackLayout class="px-2 mx-2 mb-4" width="100%">
        <flexboxLayout justifyContent="space-between" width="100%">
           
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>
                <formattedString>
                    <span text="{game.name}" class="text text-h2" />
                </formattedString>
            </label>
            <stackLayout on:tap={handleClose}>
                <Icon path="~/static/close.png" size="medium" />
            </stackLayout>
        </flexboxLayout>
    </stackLayout>
</actionBar>

<script type="ts">
    import { navigate } from 'svelte-native';
    import { GameDefaults } from '~/defaults';
    import type { Game } from "~/types";

    import Home from "~/pages/home.svelte";
    import Icon from "~/components/icon.svelte";

    export let game:Game = GameDefaults;
    export let onClose = () => null; 

    const handleClose = () => {
        onClose();

        navigate({
            // @ts-ignore
            page: Home,
            clearHistory: true,
        });
    };
</script>