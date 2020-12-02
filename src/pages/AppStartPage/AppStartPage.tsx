import { IonButton, IonContent, IonIcon, IonLoading, IonPage } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import "./AppStartPage.css";
import GoogleLogo from "../../assets/designs/google_logo.svg"
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const App_Start_Page: React.FC =() => {
    const firebase = useFirebase();
    const auth = useSelector((state:any) => state.firebase.auth);

    function loginWithGoogle() {
        firebase.login({ provider: 'google', type: 'popup' }).then(()=>{
            console.log("loged in!");
        }).catch((err)=>console.log(err))
    }

    const LoginComponent = ()=> {
        return(
            <div>
                <div className="top_left_circle" ></div>
                <div className="loginBody">
                    <div className="appLogo"></div>
                    <h1>RainBooks</h1>
                    <IonButton fill="outline" onClick={()=>loginWithGoogle()} className="googleLoginButton">
                        <IonIcon icon={GoogleLogo} slot="start" />
                        Sign in with Google
                    </IonButton>
                </div>
                <div className="bottom_dots" ></div>
            </div>
        )
    }
    
    return (
        <IonPage>
            <IonContent fullscreen>
                <div>
                    {
                    isEmpty(auth)
                        ? <LoginComponent />
                        : <div>
                            <IonButton onClick={()=>{
                                firebase.logout();
                            }}>Log out</IonButton>
                            <pre>{JSON.stringify(auth, null, 2)}</pre>
                        </div>
                    }
                </div>

                <IonLoading
                    isOpen={!isLoaded(auth)}
                    message={"Please wait..."}
                />
            </IonContent>
        </IonPage>
    )
};

export default App_Start_Page;