import React from 'react';
import {Text, StyleSheet,Image,View,TouchableOpacity, Button} from 'react-native';
import {Fragment,Component} from 'react';
import {Fonts} from './Fonts';

const Thumbsdown = () => {
    return(
         <View style={styles.container}>
         <Image source={require('../assets/img/thumbsdown.png')} 
            style={{width:80,height:80,marginLeft:'auto',marginRight:'auto',}} />
            <View style={{textAlign:'center'}}>
            <Text style={styles.placename}>Gun Free Zone</Text>
            <Text style={styles.count}>3,829</Text>
            </View>
         </View>
    )
}

const styles =StyleSheet.create({
    container:{
        width:"50%"
    },
    placename:{
        color:'black',
        fontFamily: Fonts.Latoregular,
        fontSize: 18,
        paddingTop:20,
        textAlign:'center'
    
    },
    count:{
        color:'black',
        fontFamily: Fonts.Latobold,
        fontSize: 15,
        paddingTop:5,
        marginLeft:'auto',
        marginRight:'auto',
    
    },
 })

export {Thumbsdown}