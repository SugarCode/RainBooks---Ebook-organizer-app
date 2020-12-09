import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';


import store  from './redux/CreateStore';
import * as serviceWorker from './serviceWorker';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5MXCqYNGnyPdfC_cMGqSZxg2xtKpQmSs",
    authDomain: "ebook-organizer-378e3.firebaseapp.com",
    databaseURL: "https://ebook-organizer-378e3.firebaseio.com",
    projectId: "ebook-organizer-378e3",
    storageBucket: "ebook-organizer-378e3.appspot.com",
    messagingSenderId: "923221756336",
    appId: "1:923221756336:web:244c00ef7f44fd20702e75",
    measurementId: "G-BYXR4SZ72T"
};



try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    console.log(err)
}

const rrfConfig = {
    userProfile: 'users',
    // useFirestoreForProfile: true // use Firestore for profile instead of RTDB
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
}

ReactDOM.render(
    <Provider store={store}>
        {/* <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider> */}
        <App />
    </Provider>
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
