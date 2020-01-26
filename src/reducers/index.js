import { combineReducers } from 'redux';
import auth from './authentication';


const reducer = combineReducers({
    auth
})

export default (state, action) => {
    if(action.type === 'CLEAR')
        state = null;
    
    return reducer(state, action);
}