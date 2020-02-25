import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {GlobalStyles} from "../helpers/GlobalStyles";
import TopBar from "./TopBar";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {Constants} from "../helpers/Constants";
import CustomButton from "./CustomButton";
import SplashScreen from "./SplashScreen";
import AsyncStorage from "@react-native-community/async-storage";

export default class LogoutScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    _setLoggedIn = async (bool) => {
        try {
            await AsyncStorage.setItem('ISLOGGEDIN', bool ? "TRUE" : "FALSE");
        } catch (error) {
            // Error saving data
        }
    };

    componentDidMount() {
        this._setLoggedIn(false).then(() => {
            this.props.navigation.navigate('Login');
        });
    }

    render() {
        return (
            <SplashScreen {...this.props}/>
        );
    }
}