import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.speak2m2.mobile',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  webpackConfigPath: './svelte-native.webpack.config.js',
  appPath: 'app',
} as NativeScriptConfig
