import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, Button, Alert, Linking} from 'react-native';
import {Fragment, Component} from 'react';
import {Fonts} from './Fonts';
import {GetPlaceIdVotes, GetUserInfo, StorePlaceIdVote} from "../helpers/Util";
import EventListeners from "../helpers/EventListeners";

class PlaceVote extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            user: {
                ID: 0,
                display_name: "",
                user_email: "",
                photo: ""
            }
        };
    }

    _loadUserInfo = () => {
        GetUserInfo()
            .then(user => {
                try {
                    user = JSON.parse(user);

                    this.setState({
                        user,
                    });
                } catch (e) {

                }
            });
    };

    _getCount = () => {
        const {place, direction, onComplete} = this.props;

        GetPlaceIdVotes(place.placeId, direction)
            .then(votes => {
                if (!this.unmount)
                    this.setState({count: votes.data.length}, () => onComplete());
            })
            .catch(err => {
                console.warn("GetPlaceIdVotes: " + err);
                onComplete();
            });
    };

    _onResponse = (res) => {
        console.log(res);
        const {onComplete, onLoading} = this.props;

        onLoading();

        if (res.error) {
            Alert.alert('Already voted', res.message);
            onComplete();
        } else {
            this._getCount();
        }

        EventListeners.trigger('VotePlaced');
    };

    _onLocationUpdate = () => {
        const {onLoading} = this.props;

        onLoading();

        this._getCount();
    };

    componentDidMount() {
        this.unmount = false;
        this.classId = this.toString() + Math.random();

        this._getCount();
        this._loadUserInfo();

        EventListeners.addListener(this.classId, 'VotePlaced', this._getCount);
        EventListeners.addListener(this.classId, 'LocationChanged', this._onLocationUpdate);
    }

    componentWillUnmount() {
        this.unmount = true;

        EventListeners.removeListener(this.classId, 'VotePlaced');
        EventListeners.removeListener(this.classId, 'LocationChanged');
    }

    render() {
        const {count, user} = this.state;
        const {place, direction, text, icon_img, onLoading} = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    onLoading();

                    StorePlaceIdVote(place, user.ID, direction)
                        .then(res => this._onResponse(res))
                        .catch(err => console.warn("StorePlaceIdVote: " + err));
                }}
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