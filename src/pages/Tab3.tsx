import React, { useEffect } from 'react';
import { IonButton, IonContent, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonToggle } from '@ionic/react';
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
            <IonItemDivider>Interface</IonItemDivider>
            <IonItem>
              <IonLabel>Reading mode</IonLabel>
              <IonToggle
                checked={settings.TextOnly}
                onIonChange={(e)=>{
                  console.log(e.detail);
                  dispatch(SetSettings({
                    ...settings, TextOnly: e.detail.checked
                  }));
                }}
              ></IonToggle>
            </IonItem>

            {/* Select font */}
            <IonItem>
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

                <IonItem>
                  <IonLabel>Dark</IonLabel>
                  <IonRadio slot="end" value="dark"></IonRadio>
                </IonItem>
                <IonItem>
                  <IonLabel>Brown</IonLabel>
                  <IonRadio slot="end" value="brown"></IonRadio>
                </IonItem>
                <IonItem>
                  <IonLabel>White</IonLabel>
                  <IonRadio slot="end" value="white"></IonRadio>
                </IonItem>
              </IonRadioGroup>
            </IonList>


              <IonButton fill="clear" expand="block" onClick={()=>logOut()}>
                <IonIcon slot="start" icon={logOutOutline}></IonIcon>
                Logout
              </IonButton>

          </IonList>
      </IonContent>
  );
};

export default Tab3;
