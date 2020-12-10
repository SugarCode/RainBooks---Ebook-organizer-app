import React from 'react';
import { IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/CreateStore';
import { SetSettings } from '../redux/Actions/GeneralActions';

const Tab3: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState)=>state.settings)
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
          </IonList>
      </IonContent>
  );
};

export default Tab3;
