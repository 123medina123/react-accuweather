import axios from 'axios';

const API_KEY = 'pG6GAe25xofAOq5qqPe9YOkT3tuQL900';
const API_HOST = 'https://dataservice.accuweather.com/';
const API_VERSION = 'v1';

const getLocationApiUrl = (param, group,term) => `${API_HOST}locations/${API_VERSION}/${param}/${group}?apikey=${API_KEY}&q=${term}`;

const getWeatherApiUrl = key => `${API_HOST}forecasts/${API_VERSION}/daily/5day/${key}?apikey=${API_KEY}`;

const getAutoComplete = (term) => `${API_HOST}locations/${API_VERSION}/cities/autocomplete?apikey=${API_KEY}&q=${term}`;

export async function getAutoCompleteFunc(term){
  return await axios.get(getAutoComplete(term));
}

export async function getMyLocation(term){
    return await axios.get(getLocationApiUrl('cities', 'search', term));
}

export function getPosition(options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export default async function fetchWeather(key) {
  return await axios.get(getWeatherApiUrl(key));

}
