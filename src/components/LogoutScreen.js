import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {GlobalStyles} from "../helpers/GlobalStyles";
import TopBar from "./TopBar";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {Constants} from "../helpers/Constants";
import CustomButton from "./CustomButton";
import SplashScreen from "./SplashScreen";
import AsyncStorage from "@react-native-community/async-storage";
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

export default class LogoutScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    _setLoggedOut = async () => {
        try {
            await AsyncStorage.removeItem('USER_INFO');

            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.warn(error);
        }
    };

    componentDidMount() {
        this._setLoggedOut().then(() => {
            this.props.navigation.navigate('Login');
        });
    }

    render() {
        return (
            <SplashScreen {...this.props}/>
        );
    }
}