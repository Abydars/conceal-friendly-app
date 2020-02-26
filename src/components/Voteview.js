import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, Button} from 'react-native';
import {Fragment, Component} from 'react';
import {Fonts} from './Fonts';
import {PlaceVote} from './PlaceVote';
import {Divider} from 'react-native';

const VoteView = ({style, placeName, placeId}) => {
    return (
        <View style={style}>
            <Text style={styles.placename}>{placeName}</Text>
            <View style={styles.thumbs}>
                <PlaceVote direction={"up"} text={"Carry Friendly"} placeId={placeId}/>
                <PlaceVote direction={"down"} text={"Gun Free Zone"} placeId={placeId}/>
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