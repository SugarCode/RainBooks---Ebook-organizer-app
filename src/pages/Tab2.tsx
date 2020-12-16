import React, { useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { SetOpenPdf } from '../redux/Actions/GeneralActions';

// importing images
import FileManagerLogo from "../assets/designs/select file tutorial logos/file manager.png";
import FolderLogo from "../assets/designs/select file tutorial logos/folder.png"
import FileSelectedLogo from "../assets/designs/select file tutorial logos/file selected.png";
// tab2 styles
import './Tab2.css';


const Tab2: React.FC = () => {
  interface toastI {
    show: boolean,
    msg: string
  }
  const [showToast, setShowToast] = useState<toastI>({show: false, msg: ""});
  const history = useHistory();
  const dispatch = useDispatch();

  /**
   * Handle html input file change event
   * 1. Checks if the file is pdf or not, 
   * 2. set selected pdf information to redux state, 
   * 3. navigate to pdf viewer page
   */
  const handleAddBook = (e:React.ChangeEvent<HTMLInputElement>)=> {
    if(e.target.files){
      const file = e.target.files[0];
      if(file.type === "application/pdf"){
        dispatch(SetOpenPdf({
          Pdf_Opened: true,
          FilePath: file,
          FileName: file.name
        }))
        history.push("/tab-pdf-viewer")
      }
    }else{
      // for some reason mobile is not showing alert or toast
      setShowToast({show: true, msg: "File type not supported"})
    }
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
              <input type="file" onChange={(e)=>handleAddBook(e)} accept="application/pdf" style={{ position: "absolute",opacity: "0", border: "1px solid black", height: "50px", width: "180px" }} ></input>
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
        
      <IonToast
      isOpen={showToast.show}
      onDidDismiss={() => setShowToast({show: false, msg: ""})}
      message={showToast.msg}
      position="top"
      duration={2500}
      translucent={true}
      mode="ios"
    />
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
