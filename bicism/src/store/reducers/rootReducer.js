import authReducer from './authReducer';
import mapsReducer from './mapsReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    maps: mapsReducer
})

export default rootReducer;