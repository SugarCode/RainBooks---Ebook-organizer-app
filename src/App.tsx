import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';

import {
  IonActionSheet,
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
import { SetSettings } from './redux/Actions/GeneralActions';

// import "./AppStyle.css";

const App: React.FC = () => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState)=>state.settings)

  useEffect(()=>{
    setTimeout(()=>{
      const settingsButton = document.querySelector(".settingsBtn");
      console.log(settingsButton?.shadowRoot?.innerHTML)
      if(settingsButton?.shadowRoot){
        settingsButton.shadowRoot.querySelector('.button-native')?.removeAttribute("href")
        settingsButton.shadowRoot.querySelector('.button-native')?.addEventListener("click", ()=>{
          setOpenSettings(!openSettings)
        })
      }
    }, 1000)
  }, [])

  const auth = useSelector((state:any) => state.firebase.auth);
  return (
    <IonApp>
      {/* {
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
              <IonTabBar slot="bottom" 
                // hidden={openPdf.Pdf_Opened === true?true:false}
              >
                <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon icon={bookOutline} />
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon icon={addCircleOutline} />
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon icon={settingsOutline} />
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
      } */}

{/* Delete the following element and uncomment the upper section */}
      <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/tab1" component={Tab1} exact={true} />
                <Route path="/tab2" component={Tab2} exact={true} />
                <Route path="/tab3" component={Tab3} />
                <Route path="/tab-pdf-viewer" component={TabPdfViewer} />
                <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom" 
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
      </IonReactRouter>

            

      <IonModal
        isOpen={openSettings}
        onDidDismiss={()=>setOpenSettings(false)}
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
