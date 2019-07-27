import { PUSH_CITY,DELETE_CITY } from '../components/Weather';

export default function(state = [], action){
	switch (action.type){
  	case PUSH_CITY:{
      return [action.payload,...state];
			}
		case DELETE_CITY:{
			return ([
				...state.slice(0, action.index),
        ...state.slice(action.index + 1)
			]);
			}
    }
	return state;
}
