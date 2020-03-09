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
                        <Text style={GlobalStyles.pageText}>The safety of others is important to us. Safety includes the
                            option to conceal carry within legal limits. Many gun owners have shared stories with us
                            about attending events, going to restaurants, etc., and finding themselves in the situation
                            that their gun is not welcome with them.</Text>

                        <Text style={GlobalStyles.pageText}>We built this application to provide a quick reference so
                            you will know if businesses are gun-friendly before you leave the house. Your gun can then
                            stay safely at home rather than locked in your car.</Text>

                        <Text style={GlobalStyles.pageText}>Your contributions to the database are greatly appreciated.
                            We can all help each other make the best Conceal Carry decisions together!</Text>

                        <Text style={GlobalStyles.pageText}>For each business you give a conceal friendly or gun free
                            zone rating to you will be entered into a drawing for prizes like new holsters, ammo guards,
                            and one person a month will win a 1 year membership to USCCA Elite, a $564 value! So go to
                            the website or app and mark the businesses you frequent everyday and help all conceal carry
                            holders KNOW BEFORE THEY GO!
                        </Text>
                    </Content>
                </ImageBackground>
            </View>
        );
    }
}