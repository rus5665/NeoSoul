module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-worklets/plugin', {}, 'worklets-plugin'],
    ['react-native-reanimated/plugin', {}, 'reanimated-plugin'],
  ],
};
