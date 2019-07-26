import { PUSH_CITY } from '../components/Weather';

export default function(state = [], action){
	switch (action.type){
  	case PUSH_CITY:
      return [action.payload,...state];
    }
	return state;
}
