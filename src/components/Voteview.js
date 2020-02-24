import React from 'react';
import {Text, StyleSheet,Image,View,TouchableOpacity, Button} from 'react-native';
import {Fragment,Component} from 'react';
import {Fonts} from './Fonts';
import {Thumbsup} from './Thumbsup';
import {Thumbsdown} from './Thumbsdown';
import { Divider } from 'react-native';

const Voteview = () => {
    return(
         <View style={{backgroundColor:'white',width:'85%',height: '34%',
         position: 'absolute', 
         top: 450, 
         borderRadius:10,}}>
            <Text style={styles.placename}>Place Name Here</Text>
            <View style={styles.thumbs}>
               <Thumbsup></Thumbsup>
               <Thumbsdown></Thumbsdown>
            </View>
         </View>
    )
}

const styles =StyleSheet.create({
    placename:{
        color:'black',
        fontFamily: Fonts.Latoregular,
        fontSize: 35,
        padding:20,
        paddingTop:20,
        paddingBottom:50,
        textAlign:'center'

    },
    thumbs:{
        flex: 1, 
        flexDirection: 'row'
    }


})

export {Voteview}