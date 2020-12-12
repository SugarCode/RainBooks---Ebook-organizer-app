import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonLoading, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { firebaseConnect, useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/CreateStore';
import { closeCircleOutline, trashOutline } from 'ionicons/icons';
import { resolve } from 'dns';
import { SetOpenPdf } from '../redux/Actions/GeneralActions';
import { useHistory } from 'react-router';


const Tab1: React.FC = () => {
  interface BookDataI {
    fullPath: string;
    fileName: string;
    size: number;
    thumbnail: string;
    storagePath: string;
    downloadUrl: string
  }
  
  const authData = useSelector((state: RootState)=> state.firebase.auth);
  
  const [bookData, setBookData] = useState<BookDataI[]>([]);
  const [filteredList, setFilteredList] = useState<BookDataI[]>([]);

  const firebase = useFirebase();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // Function for Get books data from realtime db
  const getBooksData = ()=>{
    setIsLoading(true);
    setBookData([]);
    return new Promise<void>((resolve, reject)=>{
      const booksDatabase = firebase.database().ref(`${authData.displayName?.split(" ")[0]}_${authData.uid}/books`);
      booksDatabase.once('value').then((snapshot)=> {
        const booksObject = snapshot.val();
        Object.keys(booksObject).map((k:string) => {
          const nestedKey = Object.keys(booksObject[k])[0];
          console.log((booksObject[k][nestedKey] as BookDataI));
          setBookData((prevState)=>(
            [...prevState, (booksObject[k][nestedKey] as BookDataI)]
          ))
          setIsLoading(false);
          resolve();
        })
      }).catch(()=>{setIsLoading(false);reject()})
    })
  }

  const deleteBook = (fullPath: string, storagePath: string) => {
    setIsLoading(true);
    firebase.deleteFile(fullPath, storagePath).then(()=>{
      getBooksData();
    }).catch((err)=>console.log(err))
  }

  useIonViewDidEnter(()=>{
    getBooksData();
  });

  const handleCardClick = (downloadUrl:string, filename:string)=>{
    dispatch(SetOpenPdf({
      Pdf_Opened: true,
      FilePath: "",
      FileName: filename,
      FileUrl: downloadUrl
    }))
    history.push("/tab-pdf-viewer")
  }


  const handleSearchInput = (inputVal: string | undefined) => {
    if (inputVal){
        const _filteredList = bookData.filter((data)=>data.fileName.toLowerCase().includes(inputVal));
        setFilteredList(_filteredList);
    }else{
      setFilteredList([])
    }
  }

  interface BookCardI {
    item:BookDataI, index:number
  }
  const BookCard:React.FC<BookCardI> = ({item, index})=>{
    return (
      <IonCard onClick={()=>{handleCardClick(item.downloadUrl, item.fileName)}} key={index} mode="ios" button>
        {item.thumbnail? 
        <img src={item.thumbnail} alt="book thumnail" />: null }
        <IonCardHeader>
          <IonCardTitle>{item.fileName}</IonCardTitle>
        </IonCardHeader>
        <IonButton onClick={(e)=>{
          e.stopPropagation();
          deleteBook(item.fullPath, item.storagePath)
        }} size="small" fill="clear" class="removeBtn">
          <IonIcon size="small" icon={trashOutline}></IonIcon>
        </IonButton>
    </IonCard>
    )
  }


  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>
            <h1>Your books</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonSearchbar debounce={500} onIonClear={()=>setFilteredList([])} onIonChange={(e)=>handleSearchInput(e.detail.value)} mode="ios"></IonSearchbar>

          <div className="bookList">
          {
            filteredList.length
            ?filteredList.map((item:BookDataI, index:number)=>(
              <BookCard  key ={index} item ={item} index={index} />
            ))
            :bookData.map((item:BookDataI, index:number)=>(
              <BookCard  key ={index} item ={item} index={index} />
            ))
          }
          </div>
          
      </IonContent>

      <IonLoading
        isOpen={isLoading}
        onDidDismiss={()=>setIsLoading(false)}
        message={"Syncing data"}
      />
    </IonPage>
  );
};

export default Tab1;
