import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
    Keyboard,
    StatusBar,
    BackHandler,
    BackAndroid
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GlobalStyles} from "../helpers/GlobalStyles";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {VoteView} from "./Voteview";
import Geolocation from '@react-native-community/geolocation';
import {GetLocation, GetRegionForCoordinates} from "../helpers/Util";
import {Constants} from "../helpers/Constants";

const GooglePlacesInput = ({locationName, onChange}) => {
    return (
        <View>
            <GooglePlacesAutocomplete
                suppressDefaultStyles={true}
                placeholder='Search'
                minLength={2}
                numberOfLines={1}
                autoFocus={false}
                returnKeyType={'search'}
                keyboardAppearance={'light'}
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    onChange({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                    }, data.description, data.place_id);
                }}
                getDefaultValue={() => locationName}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: Constants.GOOGLE_API_KEY,
                    language: 'en', // language of the results
                    //types: '(cities)' // default: 'geocode'
                }}
                styles={{
                    textInputContainer: {
                        width: '100%',
                        backgroundColor: '#FFF',
                        borderRadius: 3,
                        marginTop: 15,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 7,
                        },
                        shadowOpacity: 0.44,
                        shadowRadius: 10.32,
                        elevation: 16
                    },
                    textInput: {
                        fontSize: 14,
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        margin: 0,
                    },
                    description: {
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        fontSize: 10,
                    },
                    loader: {
                        margin: 0,
                        position: 'absolute',
                        top: 0,
                        display: 'none'
                    },
                    androidLoader: {
                        margin: 0,
                        position: 'absolute'
                    },
                    predefinedPlacesDescription: {
                        color: 'black'
                    },
                    listView: {
                        backgroundColor: '#FFF'
                    }
                }}
                onFail={(msg) => alert(msg)}
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    //type: ['cafe']
                }}
                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'geometry',
                }}
                enablePoweredByContainer={false}
                //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                //currentLocationLabel="Current location"
                nearbyPlacesAPI='None' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        </View>
    );
};

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentLocation: {
                latitude: 37.78825,
                longitude: -122.4324
            },
            locationName: "",
            locationId: "X",
            placeFound: false,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        };
    }

    _onSearch = (currentLocation, locationName, locationId) => {
        const {latitudeDelta, longitudeDelta} = GetRegionForCoordinates([
            currentLocation,
            // {latitude: currentLocation.viewport.northeast.lat, longitude: currentLocation.viewport.northeast.lng},
            // {latitude: currentLocation.viewport.southwest.lat, longitude: currentLocation.viewport.southwest.lng}
        ]);
        this.setState({
            locationName,
            currentLocation,
            latitudeDelta,
            longitudeDelta,
            locationId: locationName
        });
    };

    _keyboardDidShow = () => {
        this.setState({
            placeFound: false
        });
    };

    _keyboardDidHide = () => {
        this.setState({
            placeFound: true
        });
    };

    _handleBackPress = () => {
        BackHandler.exitApp();
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );

        Geolocation.getCurrentPosition(
            position => {
                const currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                this.setState({
                    currentLocation
                });

                GetLocation(currentLocation)
                    .then(res => {
                        if (res.results?.length > 0) {
                            let locationName = res.results[0].formatted_address;
                            let locationId = res.plus_code.global_code;

                            this.setState({
                                locationName,
                                locationId: locationName,
                                placeFound: true
                            });
                        } else {
                            Alert.alert('Error', "Unable to find location");
                        }
                    })
                    .catch(err => Alert.alert('Error', err + ""));
            },
            error => Alert.alert('Error', 'Error locating, please try again'),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        this.backHandler.remove()
    }

    render() {
        const {currentLocation, locationName, locationId, placeFound, latitudeDelta, longitudeDelta} = this.state;

        return (
            <View style={GlobalStyles.container}>
                <View style={styles.mapViewContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: longitudeDelta,
                        }}
                    >
                        <Marker coordinate={currentLocation}/>
                    </MapView>
                </View>
                <View style={GlobalStyles.header}>
                    <View style={GlobalStyles.headerLeft}>
                        <Image
                            style={GlobalStyles.headerLogo}
                            source={require('../assets/img/logo-icon.png')}
                        />
                    </View>
                    <View style={GlobalStyles.headerCenter}>
                        <GooglePlacesInput
                            locationName={locationName}
                            onChange={this._onSearch}
                        />
                    </View>
                    <View style={GlobalStyles.headerRight}>
                        <TouchableOpacity
                            onPress={this.props.navigation.toggleDrawer}
                            style={GlobalStyles.drawerButton}>
                            <Icon
                                style={GlobalStyles.drawerButtonIcon}
                                name="bars"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {placeFound &&
                <View style={styles.voteView}>
                    <VoteView placeId={locationId} placeName={locationName}/>
                </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mapViewContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 5
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    voteView: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 5,
        backgroundColor: '#FFF',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16
    }
});