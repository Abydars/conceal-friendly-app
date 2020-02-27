import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, Button} from 'react-native';
import {Fragment, Component} from 'react';
import {Fonts} from './Fonts';
import {PlaceVote} from './PlaceVote';
import {Divider} from 'react-native';

const VoteView = ({style, placeName, placeId}) => {
    return (
        <View style={style}>
            <Text style={styles.placename} numberOfLines={3}>{placeName}</Text>
            <View style={styles.thumbs}>
                <PlaceVote direction={"up"}
                           text={"Carry Friendly"}
                           placeId={placeId}
                           icon_img={require('../assets/img/thumbsup.png')}
                />
                <View style={styles.verticalBorder}/>
                <PlaceVote
                    direction={"down"}
                    text={"Gun Free Zone"}
                    placeId={placeId}
                    icon_img={require('../assets/img/thumbsdown.png')}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    placename: {
        color: 'black',
        fontFamily: Fonts.Latoregular,
        fontSize: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        paddingTop: 15,
        textAlign: 'center'
    },
    thumbs: {
        flex: 1,
        flexDirection: 'row'
    },
    verticalBorder: {
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#d6d7da'
    }
});

export {VoteView}