import { combineReducers } from 'redux';
import weatherReducer from './WeatherReducer';

const rootReducer = combineReducers({
   cities: weatherReducer
});

export default rootReducer;
