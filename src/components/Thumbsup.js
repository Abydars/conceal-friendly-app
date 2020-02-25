import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, Button} from 'react-native';
import {Fragment, Component} from 'react';
import {Fonts} from './Fonts';

const Thumbsup = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/thumbsup.png')}
                   style={{width: 60, height: 60, marginLeft: 'auto', marginRight: 'auto',}}/>
            <Text style={styles.placename}>Carry Friendly</Text>
            <Text style={styles.count}>3,829</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "50%",
        height: "70%",
        borderLeftColor: 'black',
        borderWidth: 5,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 2,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: '#d6d7da',
    },
    placename: {
        color: 'black',
        fontFamily: Fonts.Latoregular,
        fontSize: 18,
        paddingTop: 20,
        textAlign: 'center'
    },
    count: {
        color: 'black',
        fontFamily: Fonts.Latobold,
        fontSize: 15,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
})

export {Thumbsup}