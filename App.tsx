/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { QueryProvider } from './src/providers/QueryProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
      </SafeAreaProvider>
    </QueryProvider>
  );
}

export default App;
