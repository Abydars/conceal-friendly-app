import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GlobalStyles} from "../helpers/GlobalStyles";
import {Container, Content, getTheme, material, StyleProvider} from "native-base";
import {VoteView} from "./Voteview";

const homePlace = {description: 'Home', geometry: {location: {lat: 48.8152937, lng: 2.4597668}}};
const workPlace = {description: 'Work', geometry: {location: {lat: 48.8496818, lng: 2.2940881}}};

const GooglePlacesInput = () => {
    return (
        <View>
            <GooglePlacesAutocomplete
                suppressDefaultStyles={true}
                placeholder='Search'
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                keyboardAppearance={'light'}
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.warn(data, details);
                }}
                getDefaultValue={() => ''}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyCcRqZa9fnwSIYv15h6JFjkbhiBfkyu2I4',
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
                        elevation: 16,
                    },
                    textInput: {
                        fontSize: 14,
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        margin: 0,
                    },
                    description: {
                        width: '100%',
                        padding: 5,
                        fontWeight: 'bold',
                        backgroundColor: '#FFF'
                    },
                    predefinedPlacesDescription: {
                        color: 'black'
                    }
                }}
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'cafe'
                }}

                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'formatted_address',
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
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
    }

    componentDidMount() {
        if (navigator.geolocation !== undefined) {
            console.warn(navigator.geolocation);
        }
    }

    render() {
        return (
            <View style={GlobalStyles.container}>
                <View style={styles.mapViewContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
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
                        <GooglePlacesInput/>
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
                <View style={styles.voteView}>
                    <VoteView/>
                </View>
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
        bottom: 10,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        padding: 10
    }
});