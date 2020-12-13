import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

import {
  IonApp,
  IonIcon,
  IonModal,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircleOutline, bookOutline, settingsOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AppStartPage from './pages/AppStartPage/AppStartPage';
import { isEmpty } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import TabPdfViewer from './pages/TabPdfViewer';
import { RootState } from './redux/CreateStore';


import "./theme/AppStyle.css";
import { SetSettings } from './redux/Actions/GeneralActions';


const App: React.FC = () => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const auth = useSelector((state:any) => state.firebase.auth);
  const openPdf = useSelector((state:RootState) => state.openPdf);
  const settings = useSelector((state: RootState)=>state.settings);

  const dispatch = useDispatch();

  useEffect(()=>{
      setTimeout(()=>{
        const settingsButton = document.querySelector(".settingsBtn");
        if(settingsButton?.shadowRoot){
          settingsButton.shadowRoot.querySelector('.button-native')?.removeAttribute("href");
          settingsButton.shadowRoot.querySelector('.button-native')?.addEventListener("click", ()=>{
            console.log("open settings")
            setOpenSettings(!openSettings)
          })
          console.log(settingsButton?.shadowRoot?.innerHTML)
        }
      }, 2000)
  }, [auth, openPdf])

  const handleBottomHide = ()=> {
    dispatch(SetSettings({...settings, hideBottom: !settings.hideBottom}));
    setTimeout(()=>{
      dispatch(SetSettings({...settings, hideBottom: true}));
    }, 2000)
  }



  return (
    <IonApp>
      {
        isEmpty(auth)
          ?<AppStartPage />
          :<IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/tab1" component={Tab1} exact={true} />
              <Route path="/tab2" component={Tab2} exact={true} />
              <Route path="/tab3" component={Tab3} />
              <Route path="/tab-pdf-viewer" component={TabPdfViewer} />
              <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar style={{display: settings.hideBottom && openPdf.FileName?"none":"flex"}} slot="bottom" color={settings.modeColor==="dark"? "dark":"light"}
              // hidden={openPdf.Pdf_Opened === true?true:false}
            >
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={bookOutline} />
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={addCircleOutline} />
              </IonTabButton>
              <IonTabButton class="settingsBtn">
                <IonIcon icon={settingsOutline} />
              </IonTabButton>
            </IonTabBar>
            
          </IonTabs>
          <div style={{display: settings.hideBottom && openPdf.FileName?"block":"none"}} onClick={()=>handleBottomHide()} className="hiddenSwitch"></div>
    </IonReactRouter>
      }

      <IonModal
        showBackdrop ={true}
        swipeToClose={true}
        isOpen={openSettings}
        onDidDismiss={()=>setOpenSettings(false)}
        cssClass={"settingsModal"}
      >
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>
            <h1>Settings</h1>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={()=>{setOpenSettings(false)}}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Tab3 />
      </IonModal>     
    </IonApp>
  )
};

export default App;
