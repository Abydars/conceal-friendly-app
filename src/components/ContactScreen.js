import React from 'react';
import {View, Text, Image, ImageBackground, TextInput, Alert, ActivityIndicator} from 'react-native';
import {GlobalStyles} from "../helpers/GlobalStyles";
import TopBar from "./TopBar";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {Constants} from "../helpers/Constants";
import CustomButton from "./CustomButton";
import {SubmitContactData} from "../helpers/Util";

export default class ContactScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            message: "",
            loading: false
        };
    }

    _onSubmit = () => {
        const {name, message} = this.state;
        const data = {
            'your-name': name,
            'your-message': message,
            '_wpcf7': '53',
            '_wpcf7_version': '5.1.6',
            '_wpcf7_locale': 'en_US',
            '_wpcf7_unit_tag': 'wpcf7-f53-p50-o1',
            '_wpcf7_container_post': '50'
        };

        this.setState({loading: true});

        SubmitContactData(data)
            .then(res => {
                if (res.status === 'mail_sent') {
                    Alert.alert('Thank you!', res.message);

                    this.setState({
                        name: "",
                        message: ""
                    });

                } else {
                    Alert.alert('Error', 'Failed to send your query, please try again later');
                }

                this.setState({loading: false});
            })
            .catch(err => {
                console.warn(err);
                this.setState({loading: false});
            });
    };

    render() {
        const {name, message, loading} = this.state;

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
                        <View style={{alignContent: 'center', alignItems: 'center', marginTop: 30}}>
                            <View style={GlobalStyles.textInputContainer}>
                                <TextInput style={GlobalStyles.textInput}
                                           placeholder="Subject/Question"
                                           value={name}
                                           onChangeText={(name) => this.setState({name})}
                                           placeholderTextColor="black"/>
                            </View>
                            <View style={{...GlobalStyles.textInputContainer, marginBottom: 30}}>
                                <TextInput
                                    style={GlobalStyles.textArea}
                                    underlineColorAndroid="transparent"
                                    placeholder="Message"
                                    placeholderTextColor="black"
                                    numberOfLines={10}
                                    multiline={true}
                                    value={message}
                                    onChangeText={(message) => this.setState({message})}
                                />
                            </View>
                            {!loading &&
                            <CustomButton onPress={this._onSubmit} text="Submit" color='#21ac75'
                                          style={{alignItems: 'center', marginTop: 0}}/>
                            }
                            {loading &&
                            <ActivityIndicator size="large" color={GlobalStyles.loader.color}/>
                            }
                        </View>
                    </Content>
                </ImageBackground>
            </View>
        );
    }
}