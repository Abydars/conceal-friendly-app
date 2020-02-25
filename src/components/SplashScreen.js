import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {GlobalStyles} from "../helpers/GlobalStyles";
import TopBar from "./TopBar";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {Constants} from "../helpers/Constants";

export default class SplashScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 3000);
    }

    render() {
        return (
            <View style={GlobalStyles.container}>
                <ImageBackground
                    source={Constants.splashImage} style={{
                    width: '100%',
                    height: '100%',
                    flex: 1
                }}>
                </ImageBackground>
            </View>
        );
    }
}