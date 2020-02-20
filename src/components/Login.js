import React from 'react';
import {Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import {Fragment,Component} from 'react';
import logo from '../assets/img/complete-logo.png';
const Login = () => {
    return(
         <Fragment>
            <Image source={require('../assets/img/complete-logo.png')} 
            style={{width:320,height:220,padding:60}} />
            <Text style={styles.loginText}> Welcome </Text>
         </Fragment>
    )
}

const styles =StyleSheet.create({

    loginText: {
      color: 'black',
      fontSize: 50,
      fontWeight: '600',
      color:'green',
      padding:50
    }
})

export {Login}