import React from 'react';
import {Text, StyleSheet,Image,View,TouchableOpacity, Button} from 'react-native';
import {Fragment,Component} from 'react';
import {Fonts} from './Fonts';
import  SignButton from './SignButton'


const Login = () => {
    return(
         <Fragment>
            <Image source={require('../assets/img/cinceal-logo.png')} 
            style={{width:330,height:230,padding:30,paddingTop:50,marginTop:50}} />
            <Text style={styles.loginText}> Welcome! </Text>
            <Text style={styles.paraText}>The only app the conceal carry holder will need. Find conceal friendly places for everything you need. Shopping, Movies, Restaurants, etc. </Text>
            <View style={styles.google}>
              <Image source={require('../assets/img/google.png')} 
              style={{marginTop:20,marginLeft:20,width:'58%',height:'60%'}}/>
            </View>
            <SignButton text="Sign in with Google" color='#21ac75'></SignButton>
         </Fragment>
    )
}

const styles =StyleSheet.create({

    loginText: {
      color: '#53b584',
      fontSize: 60,
      fontWeight: 'normal',
      padding:20,
      paddingTop:50,
      fontFamily: Fonts.Latolight,
    },
    paraText: {
      color: '#404040',
      fontSize: 18,
      fontWeight: 'normal',
      textAlign:'center',
      paddingLeft:40,
      paddingRight:40,
      paddingTop:0,
      paddingBottom:20,
      fontFamily: Fonts.Latoregular,
    },
    google:{
        width:90,
        height:90,
        marginTop:35,
        borderRadius:50,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        
        elevation: 16,

    }

})

export {Login}