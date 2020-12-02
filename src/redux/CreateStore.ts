import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { firebaseReducer } from 'react-redux-firebase';

import {GeneralReducer} from "./reducers/General_Reducer";


const rootReducer = combineReducers({
    firebase: firebaseReducer,
    openPdf: GeneralReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export default store;