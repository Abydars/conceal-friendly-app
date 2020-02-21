import React from 'react';
import {Text, StyleSheet,Image, View,TouchableOpacity, Button} from 'react-native';

const SignButton = props => {
    const content =(
        <View style={[styles.button,{backgroundColor:props.color}]}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )

    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles=StyleSheet.create({
    button:{
        padding:26,
        width:300,
        borderRadius:50,
        alignItems:'center',
        backgroundColor:'red',
        marginTop:30
    },
    text:{
         color:'white',
         fontSize:20,
         alignItems:'center',
    }
})

export default SignButton;