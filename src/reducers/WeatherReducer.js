import { PUSH_CITY,DELETE_CITY,REORDER_LIST } from '../components/Weather';

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
			case REORDER_LIST:{
				const list = state.slice();
		 		const temp = state[action.from];
		 		list.splice(action.from, 1);
		 		list.splice(action.to, 0, temp);
				return list;
				}
    }
	return state;
}
