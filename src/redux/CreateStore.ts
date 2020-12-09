import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { firebaseReducer } from 'react-redux-firebase';

import {GeneralReducer} from "./reducers/General_Reducer";
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'rainbookroot',
  storage: localStorage,
  blacklist: ['openPdf']
}

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    openPdf: GeneralReducer
});
const persistRootReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(persistRootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export let persistor = persistStore(store);
export default store;