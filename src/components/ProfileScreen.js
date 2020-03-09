import React from 'react';
import {View, Text, Image, ImageBackground, StyleSheet, ActivityIndicator, TouchableOpacity, Alert} from 'react-native';
import {GlobalStyles} from "../helpers/GlobalStyles";
import TopBar from "./TopBar";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {Constants} from "../helpers/Constants";
import CustomButton from "./CustomButton";
import {Fonts} from "./Fonts";
import {GetPlaces, GetUserInfo, GetUserVotes, UpdateUserInfo, UpdateUserPhoto} from "../helpers/Util";
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

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

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            votes: [],
            loading: true,
            imageLoading: true,
            user: {
                ID: 0,
                display_name: "",
                user_email: "",
                photo: ""
            }
        };
    }

    _loadPlaces = () => {
        const {user} = this.state;

        GetUserVotes(user.ID)
            .then(votes => {
                if (!this.unmount)
                    this.setState({votes: votes.data, loading: false});
            })
            .catch(err => {
                console.warn(err);
            });
    };

    _loadUserInfo = () => {
        GetUserInfo()
            .then(user => {
                try {
                    user = JSON.parse(user);

                    this.setState({
                        user,
                        imageLoading: false
                    }, () => {
                        this._loadPlaces();

                        if (this.interval !== undefined)
                            clearInterval(this.interval);

                        this.interval = setInterval(() => {
                            this._loadPlaces();
                        }, 5000);
                    });
                } catch (e) {

                }
            });
    };

    _onPhotoChange = () => {
        const {user} = this.state;

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    user: {...user, photo: response.uri},
                    imageLoading: true
                }, () => {
                    UpdateUserPhoto(user.ID, response)
                        .then(res => {
                            UpdateUserInfo(res.data).then(() => {
                                this._loadUserInfo();
                            }).catch(err => console.warn(err));
                        })
                        .catch(err => {
                            console.warn(err);
                            Alert.alert('Error', 'Failed to upload image');
                        });
                });
            }
        });
    };

    _onPhotoDelete = () => {
        const {user} = this.state;

        UpdateUserPhoto(user.ID)
            .then(res => {
                UpdateUserInfo(res.data)
                    .then(this._loadUserInfo)
                    .catch(err => console.warn(err));
            })
            .catch(err => console.warn(err));
    };

    componentDidMount() {
        this.unmount = false;
        //this._loadPlaces();
        this._loadUserInfo();
    }

    componentWillUnmount() {
        this.unmount = true;
        clearInterval(this.interval);
    }

    render() {
        const {votes, loading, user, imageLoading} = this.state;

        return (
            <View style={GlobalStyles.container}>
                <ImageBackground
                    source={Constants.backgroundImage} style={{
                    width: '100%',
                    height: '100%',
                    flex: 1
                }}>
                    <TopBar {...this.props} centerContent={(
                        <View style={{
                            ...GlobalStyles.headerCenter,
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            {user.photo !== "" &&
                            <View style={styles.profileImageContainer}>
                                <View style={styles.profileImageContainer2}>
                                    {!imageLoading &&
                                    <Image
                                        style={styles.profileImage}
                                        source={{uri: user.photo}}
                                    />
                                    }
                                    {imageLoading &&
                                    <ActivityIndicator style={styles.imageLoader} size="large"
                                                       color={GlobalStyles.loader.color}/>
                                    }
                                </View>
                                <TouchableOpacity
                                    onPress={this._onPhotoChange}
                                    style={{...styles.photoActionButton, left: 5, backgroundColor: '#20ac75'}}>
                                    <Icon
                                        name="camera"
                                        size={20}
                                        color={'#FFF'}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this._onPhotoDelete}
                                    style={styles.photoActionButton}>
                                    <Icon
                                        name="trash-o"
                                        size={20}
                                        color={'#FFF'}
                                    />
                                </TouchableOpacity>
                            </View>
                            }
                            <Text style={{
                                ...styles.subtitle,
                                color: '#000',
                                fontSize: 22
                            }}>{user.display_name}</Text>
                            <Text style={styles.subtitle}>{user.user_email}</Text>
                        </View>
                    )}/>
                    <Content style={{...GlobalStyles.pageContent, marginTop: 250, paddingHorizontal: 30}}>
                        <Text style={styles.h3}>Your Votes</Text>
                        {votes.length > 0 &&
                        <View>
                            {votes.map(place => (
                                <VoteRow key={place.place_id + "" + Math.random()} text={place.title}
                                         direction={(place.vote === "1") ? "up" : "down"}/>
                            ))}
                        </View>
                        }
                        {!loading && votes.length < 0 &&
                        <View>
                            <Text>No votes</Text>
                        </View>
                        }
                        {loading &&
                        <ActivityIndicator size="large" color={GlobalStyles.loader.color}/>
                        }
                    </Content>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subtitle: {
        textAlign: 'center',
        color: 'grey'
    },
    h3: {
        fontFamily: Fonts.Latoregular,
        color: '#53b584',
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10
    },
    profileImageContainer: {
        position: 'relative'
    },
    profileImage: {
        ...GlobalStyles.headerTextLogo,
        height: 150,
        width: 150,
        borderRadius: 150,
        resizeMode: 'cover'
    },
    photoActionButton: {
        position: 'absolute',
        bottom: 15,
        right: 5,
        borderWidth: 2,
        borderColor: '#FFF',
        backgroundColor: '#e92256',
        padding: 5,
        borderRadius: 50,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImageContainer2: {
        height: 150,
        width: 150,
        borderRadius: 150,
        marginBottom: 20,
        backgroundColor: '#EEE',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    }
});