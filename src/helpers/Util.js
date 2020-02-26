import AsyncStorage from '@react-native-community/async-storage';

const GetLocation = ({latitude, longitude}) => new Promise((resolve, reject) => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCcRqZa9fnwSIYv15h6JFjkbhiBfkyu2I4')
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
    GetPlaceIdVotes(placeId)
        .then(count => {

            let votes = parseInt(count) + 1;

            AsyncStorage.setItem(direction.toUpperCase() + 'VOTES-' + placeId, votes + "");

            callback();
        });
};

export {
    GetLocation,
    GetPlaceIdVotes,
    StorePlaceIdVote
};