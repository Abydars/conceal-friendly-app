import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from "./Constants";

const GetAPI = (action, version) => {
    let ver = Math.random();
    let url = 'https://concealfriendly.com/';
    let params = {};

    if (version !== false) {
        params['ver'] = ver;
    }

    if (action !== false) {
        params['cfaction'] = action;
    }

    if (Object.keys(params).length > 0) {
        url += "?";

        for (let i in params) {
            url += i + '=' + params[i];
            url += "&";
        }
    }

    return url;
};

const GetUserId = () => {
    return GetUserInfo().ID;
};

const GetUserInfo = () => new Promise((resolve, reject) => {
    const value = AsyncStorage.getItem('USER_INFO');

    resolve(value);
});

const UpdateUserInfo = (userInfo) => new Promise((resolve, reject) => {

    if (userInfo !== false) {
        userInfo = JSON.stringify(userInfo);
    }

    AsyncStorage.setItem('USER_INFO', userInfo);

    resolve(userInfo);
});

const GetLocation = ({latitude, longitude}, type, rankby) => new Promise((resolve, reject) => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=' + rankby + '&location=' + latitude + ',' + longitude + '&type=' + type + '&key=' + Constants.GOOGLE_API_KEY;
    //'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + Constants.GOOGLE_API_KEY

    fetch(url)
        .then(res => resolve(res.json()))
        .catch(error => reject(error));
});

const GetPlaceIdVotes = (placeId, direction) => new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("place_id", placeId);
    formdata.append("direction", direction);

    console.log("Initiated GetPlaceIdVotes");

    fetch(GetAPI('get_votes'),
        {
            method: 'POST',
            body: formdata
        })
        .then(res => {
            console.log("Completed GetPlaceIdVotes");
            resolve(res.json());
        })
        .catch(error => {
            console.log("Completed GetPlaceIdVotes");
            reject(error);
        });
});

const UpdateUserPhoto = (userId, photo) => new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("user_id", userId);

    if (photo === undefined)
        formdata.append("delete", '1');
    else {
        formdata.append("profile_picture", {
            name: photo.fileName,
            type: photo.type,
            uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
    }

    fetch(GetAPI('user_photo_update'),
        {
            method: 'POST',
            body: formdata
        })
        .then(res => resolve(res.json()))
        .catch(error => reject(error));
});

const GetUserVotes = (user_id) => new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("user_id", user_id);

    fetch(GetAPI('get_user_votes'),
        {
            method: 'POST',
            body: formdata
        })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error));
});

const StoreUser = (user) => new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append('email', user.email);
    formdata.append('display_name', user.name);
    formdata.append('first_name', user.givenName);
    formdata.append('last_name', user.familyName);

    fetch(GetAPI('user_auth'),
        {
            method: 'POST',
            body: formdata
        })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err));
});

const StorePlaceIdVote = (place, user_id, direction) => new Promise((resolve, reject) => {
    let formdata = new FormData();

    formdata.append("place_id", place.placeId);
    formdata.append("place_name", place.placeName);
    formdata.append("user_id", user_id);
    formdata.append("vote", direction === 'up' ? 1 : 0);
    formdata.append("latitude", place.latitude);
    formdata.append("longitude", place.longitude);

    console.log("Initiated StorePlaceIdVote");

    fetch(GetAPI('post_vote'),
        {
            method: 'POST',
            body: formdata
        })
        .then(res => res.text())
        .then(res => {
            console.log("Completed StorePlaceIdVote");
            resolve(res);
        })
        .catch(err => {
            console.log("Completed StorePlaceIdVote");
            reject(err);
        });
});

const SubmitContactData = (data) => new Promise((resolve, reject) => {
    let formdata = new FormData();

    for (let [key, value] of Object.entries(data)) {
        formdata.append(key, value);
    }

    fetch(GetAPI(false, false) + '/wp-json/contact-form-7/v1/contact-forms/53/feedback',
        {
            method: 'POST',
            body: formdata
        })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err));
});

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
    GetUserVotes,
    SubmitContactData,
    GetUserInfo,
    StoreUser,
    UpdateUserPhoto,
    UpdateUserInfo
};