import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, Button, ActivityIndicator} from 'react-native';
import {Fragment, Component} from 'react';
import {Fonts} from './Fonts';
import {PlaceVote} from './PlaceVote';
import {Divider} from 'react-native';
import {GlobalStyles} from "../helpers/GlobalStyles";

class VoteView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            box1_loading: true,
            box2_loading: true
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.place.placeId !== this.props.place.placeId) {
            this.setState({
                box1_loading: true,
                box2_loading: true
            });
        }
    }

    render() {
        const {style, place, Subtitle} = this.props;
        const {placeName, placeId} = place;
        const {box1_loading, box2_loading} = this.state;

        return (
            <View style={style}>
                <Text style={styles.placename} numberOfLines={3}>{placeName}</Text>
                {Subtitle !== undefined &&
                <Subtitle/>
                }
                <View style={styles.thumbs}>
                    <PlaceVote direction={"up"}
                               text={"Carry Friendly"}
                               place={place}
                               onLoading={() => this.setState({box1_loading: true})}
                               onComplete={() => this.setState({box1_loading: false})}
                               icon_img={require('../assets/img/thumbsup.png')}
                    />
                    <View style={styles.verticalBorder}/>
                    <PlaceVote
                        direction={"down"}
                        text={"Gun Free Zone"}
                        place={place}
                        onLoading={() => this.setState({box2_loading: true})}
                        onComplete={() => this.setState({box2_loading: false})}
                        icon_img={require('../assets/img/thumbsdown.png')}
                    />
                </View>
                {(box1_loading || box2_loading) &&
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={GlobalStyles.loader.color}/>
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    placename: {
        color: 'black',
        fontFamily: Fonts.Latoregular,
        fontSize: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        paddingTop: 15,
        paddingBottom: 5,
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
    },
    loader: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: 'center'
    }
});

export {VoteView};