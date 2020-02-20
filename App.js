/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Login} from './src/components/Login';

const App: () => React$Node = () => {
  return (
    <View style={{justifyContent: "center", alignItems: "center",padding:50 }}>
    <Login />
  </View>
  );
};
export default App;
