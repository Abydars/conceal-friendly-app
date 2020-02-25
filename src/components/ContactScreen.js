import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {GlobalStyles} from "../helpers/GlobalStyles";
import TopBar from "./TopBar";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {Constants} from "../helpers/Constants";

export default class ContactScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                                style={GlobalStyles.headerTextLogo}
                                source={require('../assets/img/text-logo.png')}/>
                        </View>
                    )}/>
                    <Content style={GlobalStyles.pageContent}>
                        <Text style={GlobalStyles.pageHeading}>Contact Us!</Text>
                        <Text style={GlobalStyles.pageText}>We’re here to help & answer any question you might have. Our
                            team is ready to answer all your questions.</Text>
                    </Content>
                </ImageBackground>
            </View>
        );
    }
}