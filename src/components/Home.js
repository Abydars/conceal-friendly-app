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
    BackAndroid, Platform, Linking, ActivityIndicator
} from 'react-native';
import MapViewAnimated, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GlobalStyles, IS_IPHONE_X} from "../helpers/GlobalStyles";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import Geolocation from '@react-native-community/geolocation';
import {GetLocation, GetRegionForCoordinates} from "../helpers/Util";
import {Constants} from "../helpers/Constants";
import {VoteView} from "./Voteview";
import EventListeners from "../helpers/EventListeners";

const GooglePlacesInput = ({locationName, onChange, setRef, defaultValueUpdated}) => {
    return (
        <View>
            <GooglePlacesAutocomplete
                suppressDefaultStyles={true}
                placeholder='Search'
                minLength={2}
                numberOfLines={2}
                autoFocus={false}
                returnKeyType={'search'}
                keyboardAppearance={'light'}
                fetchDetails={true}
                textInputProps={{
                    ref: (r) => {
                        setRef(r)
                    }
                }}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    onChange({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                    }, data.description, data.place_id);
                }}
                enableHighAccuracyLocation={true}
                getDefaultValue={() => {
                    setTimeout(defaultValueUpdated, 2000);
                    return locationName;
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: Constants.GOOGLE_API_KEY,
                    language: 'en', // language of the results
                    // types: 'hotels' // default: 'geocode'
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
                        paddingVertical: Platform.OS ? 9 : 5,
                        paddingHorizontal: 15,
                        margin: 0
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
                    // rankby: 'distance',
                    // type: ['establishment']
                }}
                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'geometry',
                }}
                isRowScrollable={true}
                enablePoweredByContainer={false}
                //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                //currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        </View>
    );
};

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userLocation: {
                latitude: 0,
                longitude: 0
            },
            currentLocation: {
                latitude: 37.78825,
                longitude: -122.4324
            },
            locationName: "",
            locationId: "X",
            placeFound: false,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            autoLocated: false,
            zoomLevel: 17,
            loadingDirections: false
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
            locationId: locationId,
            placeFound: true
        });

        EventListeners.trigger('LocationChanged');
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

    _setRef = (r) => {
        this.r = r;
    };

    _defaultValueUpdated = () => {
        if (this.r !== undefined)
            this.r.blur();
    };

    _onGetDirections = () => {
        const {currentLocation, userLocation} = this.state;

        this.setState({
            loadingDirections: true
        }, () => {

            let link = 'google.navigation:q=' + currentLocation.latitude + '+' + currentLocation.longitude;

            if (Platform.OS === 'ios')
                link = 'maps://app?saddr=' + userLocation.latitude + '+' + userLocation.longitude + '&daddr=' + currentLocation.latitude + '+' + currentLocation.longitude;

            Linking.openURL(link)
                .then(() => {
                    this.setState({
                        loadingDirections: false
                    });
                })
                .catch(err => {
                    this.setState({
                        loadingDirections: false
                    });

                    Alert.alert('Not available', err.message);
                });
        });

    };

    _setLocation = (currentLocation) => {

        this.setState({
            currentLocation
        });

        GetLocation(currentLocation, 'establishment', 'distance')
            .then(res => {
                //console.log(JSON.stringify(res), currentLocation);

                let excludes = [];
                let found = false;

                if (res.results?.length > 0) {
                    for (let i in res.results) {

                        let result = res.results[i];
                        let locationName = result.name;
                        let locationId = result.place_id;

                        if (result.types.indexOf('establishment') > -1 && excludes.indexOf(locationName) === -1) {

                            found = true;

                            this.setState({
                                locationId: locationId,
                                locationName,
                                placeFound: true
                            });
                            break;
                            //console.log(result.name + " -- " + result.vicinity);

                        } else if (result.types.indexOf('locality') > -1) {
                            excludes.push(locationName);
                        }
                    }

                } else {
                    Alert.alert('Error', res.error_message);
                }

                if (!found) {
                    this.setState({
                        placeFound: false
                    });
                } else {
                    EventListeners.trigger('LocationChanged');
                }
            })
            .catch(err => {
                console.warn(err + "");

                this.setState({
                    placeFound: false
                });
            });
    };

    _onMapClick = (e) => {
        const location = e.nativeEvent.coordinate;

        this._setLocation(location);
    };

    _onMapDragStart = () => {

    };

    _onMapDragEnd = (e) => {
        const location = e.nativeEvent.coordinate;

        this._setLocation(location);
    };

    _setMapZoom = (zoom) => {
        let camera = this.map.getCamera();

        this.map.setCamera({
            ...camera,
            zoom
        });
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
                const {locationId} = this.state;

                if (locationId === 'X') {

                    let currentLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };

                    this.setState({
                        userLocation: currentLocation,
                        autoLocated: true
                    });

                    this._setLocation(currentLocation);
                }

            }, error => {

                this.setState({
                    autoLocated: true
                });

                let error_msg = error.message;

                if (error.code === 3) {
                    error_msg = 'Please enable your location service.';
                }

                Alert.alert('Location Error', error_msg);

            }, {enableHighAccuracy: false, timeout: 5000, maximumAge: 1000}
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        this.backHandler.remove()
    }

    render() {
        const {currentLocation, locationName, locationId, placeFound, latitudeDelta, longitudeDelta, autoLocated, loadingDirections} = this.state;

        return (
            <View style={GlobalStyles.container}>
                <View style={styles.mapViewContainer}>
                    <MapViewAnimated
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        loadingEnabled={true}
                        moveOnMarkerPress={true}
                        region={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: longitudeDelta,
                        }}
                        onPress={this._onMapClick}
                        ref={r => {
                            this.map = r
                        }}
                    >
                        <Marker
                            // icon={require('../assets/img/marker.png')}
                            draggable
                            coordinate={currentLocation}
                            rotation={50}
                            zIndex={100}
                            title={"Place: " + locationName}
                            description={"Tip: Long press the marker to move"}
                            onDragStart={this._onMapDragStart}
                            onDragEnd={this._onMapDragEnd}
                        />
                    </MapViewAnimated>
                </View>
                <View style={GlobalStyles.header}>
                    <View style={GlobalStyles.headerLeft}>
                        <Image
                            style={GlobalStyles.headerLogo}
                            source={require('../assets/img/logo-icon.png')}
                        />
                    </View>
                    <View style={GlobalStyles.headerCenter}>
                        {autoLocated &&
                        <GooglePlacesInput
                            locationName={locationName}
                            onChange={this._onSearch}
                            setRef={this._setRef}
                            defaultValueUpdated={this._defaultValueUpdated}
                        />
                        }
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
                    <VoteView
                        Subtitle={() => (
                            <View>
                                {!loadingDirections &&
                                <TouchableOpacity
                                    style={styles.directionButton}
                                    onPress={this._onGetDirections}
                                >
                                    <Text style={styles.directionButtonText}>Get Directions</Text>
                                </TouchableOpacity>
                                }
                                {loadingDirections &&
                                <ActivityIndicator size="large" color={GlobalStyles.loader.color}/>
                                }
                            </View>
                        )}
                        place={{
                            placeId: locationId,
                            placeName: locationName,
                            ...currentLocation
                        }}
                    />
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
        bottom: IS_IPHONE_X ? 40 : 20,
        left: 20,
        right: 20,
        borderRadius: 5,
        backgroundColor: '#FFF',
        padding: 10,
        zIndex: 9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16
    },
    directionButton: {
        alignItems: 'center',
        paddingVertical: 10
    },
    directionButtonText: {
        fontSize: 12
    }
});