import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, Button} from 'react-native';
import {Fragment, Component} from 'react';
import {Fonts} from './Fonts';
import {Thumbsup} from './Thumbsup';
import {Thumbsdown} from './Thumbsdown';
import {Divider} from 'react-native';

const VoteView = ({style}) => {
    return (
        <View style={style}>
            <Text style={styles.placename}>Place Name Here</Text>
            <View style={styles.thumbs}>
                <Thumbsup/>
                <Thumbsdown/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    placename: {
        color: 'black',
        fontFamily: Fonts.Latoregular,
        fontSize: 30,
        paddingVertical: 20,
        paddingTop: 15,
        textAlign: 'center'
    },
    thumbs: {
        flex: 1,
        flexDirection: 'row'
    }
});

export {VoteView}