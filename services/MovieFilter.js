
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';


export const getGeolocation = async () => {
    return new Promise((resolve, reject) => {
        const onReceiveLocation = geolocation => {
            resolve(geolocation);
        };

        const onError = error => {
            reject(error);
        };

        Geolocation.getCurrentPosition(onReceiveLocation, onError, {timeout: 15000, maximumAge: 10000});
    })    
};


export const filterByCountry = async (movies, geoPosition) => {
    console.log('geoposition', geoPosition.coords.latitude, geoPosition.coords.longitude)
    const location = await Geocoder.geocodePosition({lat: geoPosition.coords.latitude, lng: geoPosition.coords.longitude});

    console.log('Country', location[0].country)

    const filter = movies.filter((item, index) => {
        return (item.Country.indexOf(location[0].country) !== -1)
    })

    return filter;
}