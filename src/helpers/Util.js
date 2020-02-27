import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from "./Constants";

const GetLocation = ({latitude, longitude}) => new Promise((resolve, reject) => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + Constants.GOOGLE_API_KEY)
        .then(res => resolve(res.json()))
        .catch(error => reject(error));
});

const GetPlaceIdVotes = async (placeId, direction) => {
    let votes = await AsyncStorage.getItem(direction.toUpperCase() + 'VOTES-' + placeId);

    if (!votes || votes == null || isNaN(votes)) {
        votes = 0;
    }

    return votes;
};

const StorePlaceIdVote = async (placeId, direction, callback) => {
    GetPlaceIdVotes(placeId, direction)
        .then(count => {

            let votes = parseInt(count) + 1;

            AsyncStorage.setItem(direction.toUpperCase() + 'VOTES-' + placeId, votes + "");

            StorePlace({name: placeId, direction: direction}).then().catch();

            callback();
        });
};

const GetPlaces = async () => {
    let places = await AsyncStorage.getItem('PLACES');

    try {
        places = JSON.parse(places);
    } catch (e) {
        places = [];
    }

    if (places == null) {
        places = [];
    }

    return places;
};

const StorePlace = async (newPlace) => {
    GetPlaces()
        .then(places => {

            if (places == null)
                places = [];

            places.push(newPlace);

            AsyncStorage.setItem('PLACES', JSON.stringify(places));
        });
};

const GetRegionForCoordinates = (points) => {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;

    // init first point
    ((point) => {
        minX = point.latitude;
        maxX = point.latitude;
        minY = point.longitude;
        maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
        minX = Math.min(minX, point.latitude);
        maxX = Math.max(maxX, point.latitude);
        minY = Math.min(minY, point.longitude);
        maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    return {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX,
        longitudeDelta: deltaY
    };
};

export {
    GetLocation,
    GetPlaceIdVotes,
    StorePlaceIdVote,
    GetRegionForCoordinates,
    GetPlaces
};