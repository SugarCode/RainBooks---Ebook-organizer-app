import {combineReducers} from "redux";
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase';

interface RootState {
    firebase: FirebaseReducer.Reducer
}

const rootReducer = combineReducers<RootState>({
    firebase: firebaseReducer
});

export default rootReducer;

// code combined from -
// https://codesandbox.io/s/zrr0n5m2zp?file=/reducer.js
// https://react-redux-firebase.com/docs/getting_started.html