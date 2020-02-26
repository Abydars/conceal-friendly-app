import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, Button, ImageBackground} from 'react-native';
import {Fragment, Component} from 'react';
import {Fonts} from './Fonts';
import CustomButton from './CustomButton'
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {Constants} from "../helpers/Constants";
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        GoogleSignin.configure({
            //scopes: [], // what API you want to access on behalf of the user, default is email and profile
            //webClientId: 'com.googleusercontent.apps.264293766572-29o14e1gk2m9q2f2m1b5v1vmvgqfpra8', // client ID of type WEB for your server (needed to verify user ID and offline access)
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
            iosClientId: '665001073530-4a5sdhpdc0vc6tgsu6d2v7d3jims2nkg.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
    }

    componentDidMount() {
        this._checkIsLoggedIn();
    }

    _checkIsLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('ISLOGGEDIN');
            if (value === "TRUE") {
                this.props.navigation.navigate('Home');
            }
        } catch (error) {
            // error
        }

        this.setState({
            loading: false
        });
    };

    _setLoggedIn = async (bool) => {
        try {
            await AsyncStorage.setItem('ISLOGGEDIN', bool ? "TRUE" : "FALSE");
        } catch (error) {
            // Error saving data
        }
    };

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            this.setState({userInfo});

            this._setLoggedIn(true);
            this.props.navigation.navigate('Home');

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
                this._setLoggedIn(true);
                this.props.navigation.navigate('Home');
            }
        }
    };

    render() {
        const {loading} = this.state;

        if (loading) {
            return (<View/>);
        }

        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <ImageBackground
                        source={Constants.backgroundImage}
                        style={{
                            resizeMode: 'cover',
                            width: '100%',
                            height: '100%',
                            flex: 1,
                        }}>
                        <Content>

                            <View style={styles.container}>
                                <Image source={require('../assets/img/cinceal-logo.png')}
                                       style={{
                                           resizeMode: 'contain',
                                           width: 300,
                                           height: 200,
                                           padding: 30,
                                           paddingTop: 50,
                                           marginTop: 50
                                       }}/>
                                <Text style={styles.loginText}> Welcome! </Text>
                                <Text style={styles.paraText}>The only app the conceal carry holder will need. Find
                                    conceal
                                    friendly
                                    places
                                    for everything you need. Shopping, Movies, Restaurants, etc. </Text>
                                <View style={styles.google}>
                                    <Image
                                        source={require('../assets/img/google.png')}
                                        style={{
                                            resizeMode: 'contain',
                                            marginTop: 20,
                                            marginLeft: 20,
                                            width: 40,
                                            height: 40
                                        }}/>
                                </View>
                                <CustomButton text="Sign in with Google" color='#21ac75' onPress={this.signIn}/>
                            </View>
                        </Content>
                    </ImageBackground>
                </Container>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    loginText: {
        color: '#53b584',
        fontSize: 40,
        fontWeight: 'normal',
        padding: 20,
        paddingTop: 50,
        fontFamily: Fonts.Latolight,
    },
    paraText: {
        color: '#404040',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 0,
        paddingBottom: 20,
        fontFamily: Fonts.Latoregular,
    },
    google: {
        width: 80,
        height: 80,
        marginTop: 35,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    }

});