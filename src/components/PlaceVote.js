import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, Button} from 'react-native';
import {Fragment, Component} from 'react';
import {Fonts} from './Fonts';
import {GetPlaceIdVotes, StorePlaceIdVote} from "../helpers/Util";

class PlaceVote extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };
    }

    _getCount = () => {
        const {placeId, direction} = this.props;

        GetPlaceIdVotes(placeId, direction)
            .then(count => this.setState({count}))
    };

    componentDidMount() {
        this._getCount();
    }

    render() {
        const {count} = this.state;
        const {placeId, direction, text} = this.props;
        const icon_img = require('../assets/img/thumbs' + direction + '.png');

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => StorePlaceIdVote(placeId, direction, this._getCount)}
            >
                <Image source={icon_img}
                       style={{width: 60, height: 60, marginLeft: 'auto', marginRight: 'auto',}}/>
                <Text style={styles.placename}>{text}</Text>
                <Text style={styles.count}>{count}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        height: "70%",
        borderLeftColor: 'black',
        borderWidth: 5,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 2,
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
});

export {PlaceVote}