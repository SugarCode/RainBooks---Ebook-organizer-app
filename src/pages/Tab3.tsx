import React from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/CreateStore';
import { SetSettings } from '../redux/Actions/GeneralActions';
import { logOutOutline } from 'ionicons/icons';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router';

const Tab3: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState)=>state.settings);
  const firebase = useFirebase();
  const history = useHistory();


  const logOut = ()=> {
    firebase.logout().then(()=>{
      window.location.reload();
    }).catch(err=>console.log(err))
  }

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
                  dispatch(SetSettings({TextOnly: e.detail.checked}));
                }}
              ></IonToggle>
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
