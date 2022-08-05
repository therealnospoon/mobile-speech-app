# Speak2Me Mobile
A mobile app used by patients to perform speech therapy exercises.

## Direct Individuals Responsible
- Lucas Hugdahl | 425-367-8665 | lucashugdahl@gmail.com
- Rotem Avisar  | 216-702-7884‬ | rotem.avisar@gmail.com

## Discord Server
Join our internal dev chat. This is where we share code reviews and ask questions.
https://discord.gg/btCzcjUtRz

# Runbook

### Tech Stack
This project uses SvelteNative which is a programming language and templating framework that compiles to NativeScript.
- [SvelteNative](https://svelte-native.technology/)
- [NativeScript](https://nativescript.org/)

## Environment Setup
Install the following apps and utilities.

1. **[XCode](https://developer.apple.com/xcode/)**: Used for building the app sometimes and publishing it.
2. **[VSCode](https://code.visualstudio.com/)** (recommended): Primary project IDE.
    a. Install ESLint
    b. Install Stylelint
    c. Install Better Comments
3. **[Node](https://nodejs.org/en/)**: Node 16 seems to be required. Be sure to install version 16 or use [NVM](https://github.com/nvm-sh/nvm) to switch versions.
4. **Setup NativeScript**: Follow the [Environment Setup](https://docs.nativescript.org/environment-setup.html#macos-ios) guide provided by NativeScript for MacOS + iOS.

👨🏻‍⚕️ Test that NativeScript is setup correctly by running `ns doctor ios`.

## Get/Install
1. Clone this https://github.com/speak2me-dev/s2m-mobile
2. Navigate to the project and open it in VSCode. `cd ~/wherever-it-cloned/s2m-mobile && code .`
3. Install `npm install`

## Start Development Server
`ns run ios`

### ⚠️ First Time?
The first time you run `ns run ios` it might not work. This is because the first time you run the command, it will generate a boilerplate XCode project `/platforms, and now we have to continue setup in XCode. See XCode Setup below. Once set up, you can just run the dev command in the future.

### XCode Setup
The first time we try to run the project, it will generate a boilerplate XCode project that we need to finish setting up. Double click the the XCode project file (`.xcworkspace`) file found in `s2m-mobile/platforms/ios` on your computer to open the project in XCode.

### Code Signing
You need an Apple developer account/team for the next steps. If you don't have one you can contact any of the DRIs below.
1. Click on "Signing and Capabilities"
2. Chose "Automatically manage  signing"
3. Select/add an Apple Developer account in the "Team" field

### Setup Own Phone
To run the app on your phone, plug in your iOS device and select it by clicking the build target at the top of XCode. Be sure to "Trust" any prompts that might come up. Once your phone is selected, click the play button to attempt to build the app on your phone. If it works, then the dev command should work as well. You can now use `ns run ios` to run/build the project from now on. If there are any errors, they will be mentioned in XCode, and let the team know.

## Tests
Run tests with `tsn test ios`. More info here https://v6.docs.nativescript.org/tooling/docs-cli/project/testing/test-ios.

# Development Guide

**Start Dev**: `ns run ios`

## Files
`~` is an alias to `/app`
|||
|-|-|
|`~/App_Resources`| Native app code files to include. |
|`~/app.svelte`| App root. |
|`~/app.ts`| Entrypoint, starts the svelte-native app. |
|`~/types.ts`| Types used throughout the app. |
|`~/defaults.ts`| Default values for types. |
|`~/games/games.config.ts`| Where each game and its config is registered. |
|`~/games/`| Games and their files. |
|`~/components/`| Global components. |
|`~/pages/`| Pages to navitage to. |
|`~/modals/`| Kind of like pages, but floating on top. |
|`~/static/`| Local assets like pictures. |
|`~/util/`| Global utilities. |
|`~/main.scss`| Global styles and imports to partials. |
|`~/app.css`| **Don't change!** These styles are built via `main.scss`. This is the file consumed by svelte-native.|

## Styles
Styles are built manually using `npm run build:styles` which compiles `main.scss` -> `app.css`. Be sure to rebuild styles if you change any of the `.scss` files. 

**Experimental:**
`npm run build:styles -- --watch` in another terminal tab kinda works but has some issues.

## Pages
Pages and navigation is laid out similar to traditional routing. Files are laid out in directories and folders which correspond with their parent/sub-page relationship.

### Navigation
```js
const exit = () => navigate({
    // The component to render
    page: Home,

    // If you don't add this, there will be a "< Back" button.
    clearHistory: true,
});
```

## Modals
[WIP]


## Games
All games follow a similar pattern:
1. Tutorial
2. Playing
3. Next Level/Wind

This pattern is handled using the components found in `~/pages/game/`.

### Launching Games

Games are launched by navigating to `tutorial.svelte` while passing in a specific game config as a prop. This will launch the tutorial page filled in with the provided game config.
```js
<button on:tap={() => navigate({
    page: Tutorial,
    props : {
        game: gameConfig,
    }
})}>
```

### Playing Games
Once the user has read the tutorial and clicks the play button, the game component referenced in the game config is rendered on the page via `play.svelte`. 
```js
<svelte:component
    this={game.component}
    level={game.levels[levelIndex]}
    on:win={handleWin}
    on:lose={handleLose}
/>
```

### On Win
The user is redirected to `win.svelte` which prompts them to play the next level (if there is one) or finish the game. When they finish, they will be redirected to the home screen.
```js
const exit = () => navigate({
    // @ts-ignore
    page: Home,
    clearHistory: true,
});
```

### On Lose
[WIP]

### Next Level
If the user selects "Next Level", the game component will be rerendered but with the next level defined in the game config.
```js
const nextLevel = () => navigate({
    page: Play,
    clearHistory: true,
    props : {
        game: gameConfig,

        // Auto advance the level
        levelIndex: levelIndex + 1,
    }
});
```

### Adding a Game
All games consist of a similar game config which defines things like the metadata and level data.

#### Create Game Files
1. Create a new folder for the new game under `~/games/[game-name]`.
2. Add a  `~/games/[game-name]/[game-name].svelte` component in that directory sharing the same name as the directory.
3. Add a `~/[game-name]/[game-name].config.ts`.
4. If the game has components specific to it add a `~/[game-name]/components. Follow this convention for other game-specific things too.

**Example Config**

 ```js
export interface Game {
    name: string,
    icon: string,
    description: string,
    component: any,
    tutorial: GameTutorial,
    levels : Array<GameLevel>
}
```
```js
import { Game } from "~/types"

const config:Game = {
    name: "Cognitive",
    icon: "~/static/brain.png",
    description: "Flip over cards to find pairs.",
    component: GameCognitive,
    tutorial: {
        media: {
            type: "image",
            src: "~/static/brain.png",
        },
        instructions: "Click tiles to flip them over and reveal what's underneath. You can only flip over two tiles at once, and matched pairs will remain flipped over.",
    },
    levels: [
        {
            timeLimit: 15,
            config: {
                cards : [
                    "🚗",
                    "🏀", 
                ]
            } 
        },
        {
            timeLimit: 15,
            config: {
                cards : [
                    "🚗",
                    "🏀", 
                    "🍒",
                ]
            } 
        },
        {
            timeLimit: 15,
            config: {
                cards : [
                    "🚗",
                    "🏀", 
                    "🍒",
                    "🐸",
                ]
            } 
        },
    ]
}
```

### Level Configs
Each level must have a `timeLimit` and `config` property. The `config` property can be whatever your game needs it to be as long as it's an object. Each level will be passed into the game component one at a time as `win.svelte` advances the level index.

### Game Component Boilerplate
```html
<page class="page">
    <GameNav />

    <!-- Other game template here -->
</page>
<script type="ts">
    import type { GameLevel } from "~/types";
    
    import { createEventDispatcher } from "svelte";

    import GameNav from "~/components/game-nav.svelte"

    // The current level
    export let level:GameLevel;

    const dispatch = createEventDispatcher();

    // End the game
    const handleWin = () => dispatch("win");
</script>
```
