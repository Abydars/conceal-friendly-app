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
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Login} from './src/components/Login';
import {Voteview} from './src/components/Voteview';
import {GooglePlacesInput} from './src/components/GooglePlacesInput';


const App: () => React$Node = () => {
  return (
    // <View style={{justifyContent: "center", alignItems: "center"}}>
    //    <Voteview />
    //  </View>
    <ImageBackground source={require('./src/assets/img/background.jpg')} 
      style={styles.container}>
      <Login />
    </ImageBackground>
  );
};

const styles =StyleSheet.create({

  container: {
    width: '100%', 
    height: '100%',
    alignItems: 'center'
  },

})

export default App;

