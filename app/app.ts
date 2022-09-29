/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative } from "svelte-native";
import { TouchManager, CoreTypes } from "@nativescript/core";

import "@nativescript-community/ui-neumorphiclayout";

import App from "./pages/home.svelte";

TouchManager.enableGlobalTapAnimations = true;
TouchManager.animations = {
    down : {
        scale    : { x : 0.97, y : 0.97 },
        duration : 125,
        curve    : CoreTypes.AnimationCurve.easeInOut,
    },
    up : {
        scale    : { x : 1, y : 1 },
        duration : 125,
        curve    : CoreTypes.AnimationCurve.easeInOut,
    },
};

// @ts-ignore
svelteNative(App, {});
