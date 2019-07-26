import axios from 'axios';

const API_KEY = 'kCBGyuMGpQsTZTmB1BGorbS550PC8ZTd';//jdJtjY5LHZvdj0IS8iiRqturSfo6sjq3 //CUIJALV2AY2W5LxbnZ4wjW6A9rHJbfjG//kCBGyuMGpQsTZTmB1BGorbS550PC8ZTd// jdJtjY5LHZvdj0IS8iiRqturSfo6sjq3 // cwlzjnKODPSt5tGLh63JEXDKL03vtfMB //pG6GAe25xofAOq5qqPe9YOkT3tuQL900 //C4JuMXLb1OvfjvvdwKLjuwCQonGIFpVF
const API_HOST = 'https://dataservice.accuweather.com/';
const API_VERSION = 'v1';



const getLocationApiUrl = (param, group,term) => `${API_HOST}locations/${API_VERSION}/${param}/${group}?apikey=${API_KEY}&q=${term}`;

const getWeatherApiUrl = key => `${API_HOST}forecasts/${API_VERSION}/daily/5day/${key}?apikey=${API_KEY}`;

export default async function fetchWeather(term) {
  const cityResponse = await axios.get(getLocationApiUrl('cities', 'search', term));

  if (!cityResponse.data[0]) {
    throw new Error(term + ' was not found!');
  }

  const weatherResponse = await axios.get(getWeatherApiUrl(cityResponse.data[0].Key));
  return {
    ...weatherResponse.data,
    LocalizedName: cityResponse.data[0].LocalizedName
  };
}
