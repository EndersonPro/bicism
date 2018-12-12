import authReducer from './authReducer';
import rutesReducer from './rutesReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    rutes: rutesReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;