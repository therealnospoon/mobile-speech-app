# Speak2Me Mobile
A mobile app used by patients to perform speech therapy exercises.

### Tech Stack
This project uses SvelteNative which is a programming language and templating framework that compiles to NativeScript.
- [SvelteNative](https://svelte-native.technology/)
- [NativeScript](https://nativescript.org/)

# Runbook

## Environment Setup
Install the following apps and utilities.

1. **[XCode](https://developer.apple.com/xcode/)**: Used for building the app sometimes and publishing it.
2. **[VSCode](https://code.visualstudio.com/)** (recommended): Primary project IDE.
3. **[Node](https://nodejs.org/en/)**: Node 16 seems to be required. Be sure to install version 16 or use [NVM](https://github.com/nvm-sh/nvm) to switch versions.
4. **Setup NativeScript**: Follow the [Environment Setup](https://docs.nativescript.org/environment-setup.html#macos-ios) guide provided by NativeScript for MacOS + iOS.

👨🏻‍⚕️ Test that NativeScript is setup correctly by running `ns doctor ios`.

## Get/Install
1. Clone this https://github.com/speak2me-dev/s2m-mobile
2. Navigate to the project and open it in VSCode. `cd ~/wherever-it-cloned/s2m-mobile && code .`
3. Install `npm install`

## Start Dev Command
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

# Direct Individuals Responsible
- Lucas Hugdahl | 425-367-8665 | lucashugdahl@gmail.com
- Rotem Avisar  | 216-702-7884‬ | rotem.avisar@gmail.com

# Discord Server
Join our internal dev chat. This is where we share code reviews and ask questions.
https://discord.gg/btCzcjUtRz
