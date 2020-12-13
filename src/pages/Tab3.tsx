import React, { useEffect } from 'react';
import { IonAvatar, IonButton, IonContent, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonToggle } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/CreateStore';
import { SetSettings } from '../redux/Actions/GeneralActions';
import { logOutOutline } from 'ionicons/icons';
import { useFirebase } from 'react-redux-firebase';
import modeColorMaker from "../components/modeColorMaker";
import './Tab3.css';


const Tab3: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState)=>state.settings);
  const firebase = useFirebase();
  const authData = useSelector((state: RootState)=> state.firebase.auth);

  const logOut = ()=> {
    firebase.logout().then(()=>{
      window.location.reload();
    }).catch(err=>console.log(err))
  }


  useEffect(()=>{
    var textContainer = document.getElementById("textContainer");
    if(textContainer){
      textContainer.style.backgroundColor = modeColorMaker(settings.modeColor).background;
      textContainer.style.color = modeColorMaker(settings.modeColor).color
    }
    const textElements = Array.from(document.getElementsByClassName('textChild') as HTMLCollectionOf<HTMLElement>)
      textElements.forEach((element)=>{
        element.style.fontFamily = settings.fontName;
      })
  }, [settings])
  

  return (
      <IonContent>

          <IonList>

            <IonItemDivider>App settings</IonItemDivider>
            <IonItem>
              <IonLabel>Reading mode</IonLabel>
              <IonToggle
                checked={settings.TextOnly}
                onIonChange={(e)=>{
                  dispatch(SetSettings({
                    ...settings, TextOnly: e.detail.checked
                  }));
                }}
              ></IonToggle>
            </IonItem>

            {/* Select font */}
            <IonItem disabled={!settings.TextOnly}>
              <IonLabel>Select font</IonLabel>
              <IonSelect value={settings.fontName} onIonChange={(e)=>{
                dispatch(SetSettings({
                  ...settings, fontName: e.detail.value
                }));
              }}>
                {/* "Arapey" | "Quicksand" | "ShareTechMono" | "Unna" */}
                <IonSelectOption value="Arapey">Arapey</IonSelectOption>
                <IonSelectOption value="Quicksand">Quicksand</IonSelectOption>
                <IonSelectOption value="ShareTechMono">ShareTechMono</IonSelectOption>
                <IonSelectOption value="Unna">Unna</IonSelectOption>
              </IonSelect>
            </IonItem>

            {/* Mode color */}
            <IonList>
              <IonRadioGroup value={settings.modeColor} onIonChange={(e)=>{
                dispatch(SetSettings({
                  ...settings, modeColor: e.detail.value
                }));
              }}>
                <IonListHeader><IonLabel>Color mode</IonLabel></IonListHeader>

                <IonItem disabled={!settings.TextOnly}>
                  <IonLabel>Dark</IonLabel>
                  <IonRadio slot="end" value="dark"></IonRadio>
                </IonItem>
                <IonItem disabled={!settings.TextOnly}>
                  <IonLabel>Brown</IonLabel>
                  <IonRadio slot="end" value="brown"></IonRadio>
                </IonItem >
                <IonItem disabled={!settings.TextOnly}>
                  <IonLabel>White</IonLabel>
                  <IonRadio slot="end" value="white"></IonRadio>
                </IonItem>
              </IonRadioGroup>
            </IonList>

            {/* Hide bottom switch */}
            <IonItem disabled={!settings.TextOnly}>
              <IonLabel>Auto hide bottom bar</IonLabel>
              <IonToggle
                checked={settings.hideBottom}
                onIonChange={(e)=>{
                  dispatch(SetSettings({
                    ...settings, hideBottom: e.detail.checked
                  }));
                }}
              ></IonToggle>
            </IonItem>
            <IonLabel>
              <p style={{padding: "14px", display: settings.hideBottom?"block":"none"}}>
                To access the bottom bar, tap at the bottom of the screen.
              </p>
            </IonLabel>


            <IonItemDivider>App settings</IonItemDivider>
            <IonItem>
              {authData.photoURL
                ?<IonAvatar slot="end">
                <img src={authData.photoURL} alt="account avatar"/>
              </IonAvatar>:null}
              <IonLabel>{authData.displayName}</IonLabel>
            </IonItem>
            <IonButton fill="clear" expand="block" onClick={()=>logOut()}>
              <IonIcon slot="start" icon={logOutOutline}></IonIcon>
              Logout
            </IonButton>

          </IonList>
      </IonContent>
  );
};

export default Tab3;
