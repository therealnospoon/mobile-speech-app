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
**Run tests:** `npm test`.

### Setup Testing
Follow the steps [here](https://github.com/NativeScript/nativescript-dev-appium) to get `nativescript-dev-appium` and other dependencies on your machine.

**More on NS testing:**

https://v7.docs.nativescript.org/tooling/testing/end-to-end-testing/overview.

### Appium
Appium helps run tests and they also have a nice desktop that provides a nice visual into what's happening.

**Docs:** http://appium.io/

**Desktop App:** https://github.com/appium/appium-desktop

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
3. Next Level/Win

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
    levelIndex={levelIndex}
    subLevelIndex={subLevelIndex}
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
If the user selects "Next Level", the game component will be rerendered but with the next level defined in the game config. For levels that contain subLevels, the game component will be rerendered with the subLevel Index being reset to 0.
```js
const nextLevel = () => navigate({
    page: Play,
    clearHistory: true,
    props : {
        game: gameConfig,

        // Auto advance the level
        levelIndex: levelIndex + 1,
        subLevelIndex: 0
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

### Sublevel Configs
If your exercise requires using sublevels, simply add a sublevels property to your level's config object. This subLevel property's value is an array which is comprised of objects that look exactly like a level object. If your game uses subLevels, the play component will automatically load in your sublevel into the level prop of the custom svelte:component. When the player completes a sublevel, the 'win' event will trigger the handleWin function in play.svelte that will check to see if there is another sublevel to play. If another sublevel exists, the Play component will rerender the game component with the next subLevel and tick up the subLevelIndex. See example of how to configure sublevels into your game.

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
            timeLimit: false,
            config: {
                subLevels: [
                    {
                        timeLimit: false,
                        config: {
                            object : "🍎",
                            question : "What sound does the object start with?",
                            options : ["K", "B", "A", "Q"], 
                            answer: "A",
                            format: "letters"
                        }
                    },
                    {
                        timeLimit: false,
                        config: {
                            object : "🍎",
                            question : "What word starts with the same sound?",
                            options : ["Car", "Game", "Play", "Actual"], 
                            answer: "Actual",
                            format: "words"
                        }
                    },
                    {
                        timeLimit: false,
                        config: {
                            object : "🍎",
                            question : "What sound does the object end with?",
                            options : ["E", "B", "A", "Q"], 
                            answer: "E",
                            format: "letters"
                        }
                    },
                    {
                        timeLimit: false,
                        config: {
                            object : "🍎",
                            question : "What word does the object rhyme with?",
                            options : ["Lake", "Chapel", "Game", "Motor"], 
                            answer: "Chapel",
                            format: "words"
                        }
                    },
                    {
                        timeLimit: false,
                        config: {
                            object : "🍎",
                            question : "How many syllables does the word have?",
                            options : ["1", "2", "3", "4"], 
                            answer: "2",
                            format: "numbers"
                        }
                    },
                   
                ]
            } 
        },
    ]
}
```

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
### Using Voice-To-Text
Some games require utilizing iOS voice-to-text feature. This can easily be implemented by using the 'Voice Store' in your game component. See below for example of current usage in a game component that requires voice-to-text:
```html
<page class="page">
    <!-- use the onClose prop for GameNav to pass in stopSpeechListener function so it can run when closing the game from GameNav component -->
    <GameNav onClose="{stopSpeechListener}"/>

    <!-- Other game template here -->
</page>
<script type="ts">
    import { onMount } from "svelte";

    import type { GameLevel } from "~/types";
    
    import createSpeechListener from "~/stores/voice-store.js";

    import GameNav from "~/components/game-nav.svelte"

    // The current level
    export let level:GameLevel;

    const {
        speechStore, // Store that contains text from the SpeechRecognition module
        startSpeechListener, // Function that tells SpeechRecognition instance to begin listening for audio input;
        stopSpeechListener, // Function that stops SpeechRecognition instance to stop listening;
    } = createSpeechListener();

    onMount(() => {
        try {
            startSpeechListener();
        } catch (error) {
            console.log(error);
        }
    });

    // End the game
    const handleWin = () => dispatch("win");
</script>
```

# Deploy
Deploy the most recent version of the app to TestFlight. Make sure you have deploy permissions.
1. Checkout `git checkout main` and `git pull`.
2. Build the native script project. You can do this with `ns build ios` or utilizing `ns run ios` and using a simulator or your phone. You just need the project to generate fresh XCode files one way or another.
3. Once a build has happened, open `./platforms/ios/s2mmobile.xcworkspace` in XCode. Double check and verify in XCode the app "Display Name", "Bundle Identifier" and "Version" look as expected.
4. Archive the current files. In the top menu navigate to Product > Archive.
5. Once Archive is complete, you'll get a pop up of recent archives. Select the latest and click "Distribute App".
6. If distribute was a success, you should be able to view the new version in [Apple Connect](https://appstoreconnect.apple.com/). Once it finishes processing it will show up in TestFlight.
