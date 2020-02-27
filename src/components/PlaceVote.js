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

    componentDidUpdate(prevProps) {
        if (prevProps.placeId !== this.props.placeId) {
            this._getCount();
        }
    }

    render() {
        const {count} = this.state;
        const {placeId, direction, text, icon_img} = this.props;

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
        padding: 10
    },
    placename: {
        color: 'black',
        fontFamily: Fonts.Latoregular,
        fontSize: 14,
        paddingTop: 20,
        textAlign: 'center'
    },
    count: {
        color: 'black',
        fontFamily: Fonts.Latobold,
        fontSize: 14,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
});

export {PlaceVote}