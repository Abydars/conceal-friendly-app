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

import {Login} from './src/components/Login';
import {Voteview} from './src/components/Voteview';
import {GooglePlacesInput} from './src/components/GooglePlacesInput';



const App: () => React$Node = () => {
  return (
    <ImageBackground source={require('./src/assets/img/backgroundd.jpg')} 
      style={styles.container}>
      <GooglePlacesInput />
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



// const App = createDrawerNavigator({
//   Home: {
//     screen: PrivacyPolicy
//   },
//   Settings: {
//     screen: SettingsScreen
//   }
// });

// export default createAppContainer(App);