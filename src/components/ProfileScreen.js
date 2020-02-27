import React from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import {GlobalStyles} from "../helpers/GlobalStyles";
import TopBar from "./TopBar";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {Constants} from "../helpers/Constants";
import CustomButton from "./CustomButton";
import {Fonts} from "./Fonts";
import {GetPlaces} from "../helpers/Util";

const VoteRow = ({text, direction}) => {
    const vote = direction === 'up' ? 'Carry Friendly' : 'Gun Free Zone';
    const icon_img = direction === 'up' ? require('../assets/img/thumbsup.png') : require('../assets/img/thumbsdown.png');

    return (
        <View style={{padding: 10, flexDirection: 'row', backgroundColor: '#ecf1ef', borderRadius: 5, marginBottom: 5}}>
            <View style={{width: '50%'}}>
                <Text numberOfLines={2}>{text}</Text>
            </View>
            <View style={{width: '50%', flexDirection: 'row-reverse'}}>
                <Image
                    style={{width: 20, height: 'auto', resizeMode: 'contain'}}
                    source={icon_img}/>
                <Text style={{alignSelf: 'center', marginRight: 5}}>{vote}</Text>
            </View>
        </View>
    );
};

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            places: []
        };
    }

    _loadPlaces = () => {
        GetPlaces()
            .then(places => {
                this.setState({
                    places
                })
            });
    };

    componentDidMount() {
        this._loadPlaces();
        this.interval = setInterval(() => {
            this._loadPlaces();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {places} = this.state;

        return (
            <View style={GlobalStyles.container}>
                <ImageBackground
                    source={Constants.backgroundImage} style={{
                    width: '100%',
                    height: '100%',
                    flex: 1
                }}>
                    <TopBar {...this.props} centerContent={(
                        <View style={GlobalStyles.headerCenter}>
                            <Image
                                style={{...GlobalStyles.headerTextLogo, height: 200}}
                                source={require('../assets/img/complete-logo.png')}/>
                            <Text style={styles.subtitle}>User Name</Text>
                            <Text style={styles.subtitle}>email@none.net</Text>
                        </View>
                    )}/>
                    <Content style={{...GlobalStyles.pageContent, marginTop: 250, paddingHorizontal: 30}}>
                        <Text style={styles.h3}>Your Votes</Text>
                        {places.reverse().map(place => (
                            <VoteRow text={place.name} direction={place.direction}/>
                        ))}
                    </Content>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subtitle: {
        textAlign: 'center'
    },
    h3: {
        fontFamily: Fonts.Latoregular,
        color: '#53b584',
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10
    }
});