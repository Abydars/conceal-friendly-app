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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';



export default class App extends React.Component{
  render () {
      return (
      //    <ImageBackground source={require('./src/assets/img/backgroundd.jpg')} 
      // style={styles1.container}>
    <View style={styles1.container}>
      <GooglePlacesInput />
      <Voteview />
      {/* <MapView
        // mapType={Platform.OS == "android" ? "none" : "standard"}
        provider={PROVIDER_GOOGLE}
         style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
     />
      <MapView/> */}

    </View>
      )
  }
 }

 const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


const styles1 =StyleSheet.create({

  container: {
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    backgroundColor:'red'
  },

})




// const App = createDrawerNavigator({
//   Home: {
//     screen: PrivacyPolicy
//   },
//   Settings: {
//     screen: SettingsScreen
//   }
// });

// export default createAppContainer(App);