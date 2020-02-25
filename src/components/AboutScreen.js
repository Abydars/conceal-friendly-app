import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {GlobalStyles} from "../helpers/GlobalStyles";
import TopBar from "./TopBar";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {Constants} from "../helpers/Constants";
import CustomButton from "./CustomButton";

export default class AboutScreen extends React.Component {

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
                                style={{...GlobalStyles.headerTextLogo, height: 200}}
                                source={require('../assets/img/complete-logo.png')}/>
                        </View>
                    )}/>
                    <Content style={{...GlobalStyles.pageContent, marginTop: 200}}>
                        <Text style={GlobalStyles.pageText}>The creators of Conceal Friendly came up with this idea for
                            2 reasons.</Text>

                        <Text style={GlobalStyles.pageText}>#1 We wanted to support businesses that support and
                            appreciate the Second Amendment. We only
                            wanted to patron these places to support them in return.</Text>

                        <Text style={GlobalStyles.pageText}>#2 We got sick and tired of ordering tickets or setting
                            reservations and showing up only to
                            find out they are not a CONCEAL FRIENDLY organization and we had to go back and lock our
                            firearms (and our right to protect ourselves) in the trunk of our car.</Text>

                        <Text style={GlobalStyles.pageText}>Help us all with this by only patroning conceal friendly
                            places. If you find a place that
                            isn't listed in our database, the business has changed to a gun free zone, or they decided
                            they wanted to support the second amendment please mark it correctly. We are all only going
                            to be strong if we support ourselves.
                        </Text>
                    </Content>
                </ImageBackground>
            </View>
        );
    }
}