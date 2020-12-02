import React from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { addOutline } from 'ionicons/icons';

import FileManagerLogo from "../assets/designs/select file tutorial logos/file manager.png";
import FolderLogo from "../assets/designs/select file tutorial logos/folder.png"
import FileSelectedLogo from "../assets/designs/select file tutorial logos/file selected.png";
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { SetOpenPdf } from '../redux/Actions/GeneralActions';

const Tab2: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAddBook = (e:any)=> {
    dispatch(SetOpenPdf({
      Pdf_Opened: true,
      FilePath: e.target.files[0],
      FileName: e.target.files[0].name
    }))
    history.push("/tab-pdf-viewer")
  }

  const AddBookPanel = ()=> {
    return(
      <div>
        <IonCard color="primary" class="addBookCard">
          <IonCardHeader>
            <IonCardTitle class="cardTitle">What to read next ?</IonCardTitle>
            <IonCardSubtitle class="cardSubtitle">Choose a pdf file to read</IonCardSubtitle>
          </IonCardHeader>
          
          <IonCardContent class="cardBody">
            <IonButton color="light" class="addBookButton">
              <IonIcon slot="start" icon={addOutline} /> Add new book
              <input type="file" onChange={(e)=>handleAddBook(e)} accept="application/pdf" style={{ position: "absolute",opacity: "0", border: "1px solid black", height: "60px", width: "60px" }} ></input>
            </IonButton>
          </IonCardContent>
        </IonCard>


        <IonList className="tutorialList" lines="none">
          <IonItem>
            <IonAvatar slot="end" class="ionAvatar"><img src={FileManagerLogo} alt="FileManagerLogo"/></IonAvatar>
            <IonLabel class="ion-text-wrap">
              <h2>Step 1</h2>
              <p>Click ADD NEW BOOK button to open file manager of your device</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot="start" class="ionAvatar"><img src={FolderLogo} alt="FolderLogo"/></IonAvatar>
            <IonLabel class="ion-text-wrap ion-text-end">
              <h2>Step 2</h2>
              <p>Go to the desired folder that contains your book</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot="end" class="ionAvatar"><img src={FileSelectedLogo} alt="FileSelectedLogo"/></IonAvatar>
            <IonLabel class="ion-text-wrap">
              <h2>Step 3</h2>
              <p>Select the pdf file of your book</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </div>
    )
  }

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>
            <h1>Add book</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <AddBookPanel />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
