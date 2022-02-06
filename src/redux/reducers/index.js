import {combineReducers} from 'redux';
import loginStatusReducer from './loginStatus';
import userIdReducer from './user';

const universalReducer = combineReducers({
    login: loginStatusReducer,
    userId: userIdReducer,
})

export default universalReducer;