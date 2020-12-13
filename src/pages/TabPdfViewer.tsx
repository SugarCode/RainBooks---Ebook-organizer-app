import React, { useEffect, useState } from 'react';
import { IonActionSheet, IonAlert, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonIcon, IonLabel, IonLoading, IonMenuButton, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToast, IonToolbar, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { SetOpenPdf, SetSettings } from '../redux/Actions/GeneralActions';
import {Document, Outline, Page, pdfjs} from 'react-pdf';
import modeColorMaker from "../components/modeColorMaker";

import "../theme/pdfViewerStyle.css"
import { addCircleOutline, chevronBackOutline, chevronForwardOutline, cloudDoneSharp, cloudOfflineSharp, cloudUploadSharp, listSharp, removeCircleOutline } from 'ionicons/icons';
import { RootState } from '../redux/CreateStore';
import { useFirebase } from 'react-redux-firebase';
import { PDFPageProxy } from 'react-pdf/dist/Page';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import './Tab3.css';

function formatBytes(a:number,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}


const TabPdfViewer: React.FC = () => {
  interface toastI {
    show: boolean,
    msg: string
  }
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const dispatch = useDispatch();
  const firebase = useFirebase();
  const openPdf = useSelector((state:RootState) => state.openPdf);
  const authData = useSelector((state: RootState)=> state.firebase.auth);
  const settings = useSelector((state: RootState)=>state.settings)
  const [scale, setScale] = useState<number>(1);
  const [showJumpInput, setShowJumpInput] = useState<boolean>(false);

  const [fileExists, setFileExists] = useState<boolean>(true);
  const [showToast, setShowToast] = useState<toastI>({show: false, msg: ""});

  
  

  useIonViewWillLeave(()=>{
    dispatch(SetOpenPdf({
      Pdf_Opened: false,
      FilePath: "",
      FileName: "",
      FileUrl: ""
    }));

    var textContainer = document.getElementById("textContainer");
    if(textContainer){textContainer.innerHTML= ""}
  });

  const dataPathMaker = (filename:string):string => {
    const _fileName = filename.split(".")[0].replace(/\s+/g, '_');
    const dataPath = `${authData.displayName?.split(" ")[0]}_${authData.uid}/books/${_fileName}`;
    return dataPath;
  }


  const thumbmaker = (doc:pdfjs.PDFDocumentProxy) => {
    return new Promise((resolve, reject)=>{
      const imageMaker = async (page:pdfjs.PDFPageProxy) => {
        const viewPort = page.getViewport({scale:0.3})
        const widht = viewPort.width; const height = viewPort.height;
        var canvas = document.createElement("canvas");
        canvas.height = height; canvas.width = widht;
        // @ts-ignore: Unreachable code error
        return page.render({canvasContext: canvas.getContext("2d"), viewport: viewPort}).promise.then(()=> canvas.toDataURL("image/webp", 0.5))
      }
      try{
        doc.getPage(1).then(imageMaker).then((canvas)=>{
          resolve(canvas);
        })
      }catch(err){
        reject();
      }
    })

  }
  
  // Upload Book file
  const uploadFile = (doc:pdfjs.PDFDocumentProxy)=> {
      setShowToast({show: true, msg: `Uploading book - ${formatBytes(openPdf.FilePath.size)}`});
      const file = openPdf.FilePath;
      const storagePath = dataPathMaker(file.name)
      thumbmaker(doc).then((imageDataUri)=>{
        let uploadtask = firebase.uploadFile(storagePath, file, storagePath, {
          metadataFactory: (uploadRes, firebase, metaData, downloadURL)=>{
            return {
              "fileName": metaData.name,
              "fullPath": metaData.fullPath,
              "size": metaData.size,
              "thumbnail": imageDataUri as string,
              "storagePath": storagePath,
              "downloadUrl": downloadURL
            }
          }
        });
        uploadtask.then((snapshot)=>{
          console.log(snapshot)
          setFileExists(true)
          setShowToast({show: true, msg: "Book uploaded"});
        }).catch(err=> setFileExists(false))
      })
    
    
  }

  // On pdf document loaded event
  const onDocumentLoadSuccess = (doc:pdfjs.PDFDocumentProxy) => {
    setNumPages(doc.numPages);
    if(openPdf.FileName){
      dispatch(SetSettings({
        ...settings, TextOnly: false
      }));
      const dataPath = dataPathMaker(openPdf.FileName)
      try {
          var storageRef = firebase.storage().ref(dataPath).child(openPdf.FileName);
          storageRef.getDownloadURL().then(()=>{
              setFileExists(true);
          }).catch((err)=>{
              console.log(err)
              setFileExists(false);
              uploadFile(doc);
          })      
      } catch (error) {
        setFileExists(false);
      }
    }
  }

  useEffect(()=>{
    console.log(fileExists)
  }, [fileExists])

  // Handle next and prev button click
  const handleNavigationPage = (action: string) => {
    const bookName:string = openPdf.FileName.replace(/ /g, '');

    if(action === "prev" && pageNumber > 1){
      setPageNumber(pageNumber - 1);
      window.localStorage.setItem(bookName, pageNumber.toString());
    }else if(action === "next" && pageNumber < numPages){
      setPageNumber(pageNumber + 1);
      window.localStorage.setItem(bookName, pageNumber.toString());
    }
  }


  // on book load get the last read page number and set to current pageNumber state
  useEffect(()=>{
    if(openPdf.FileName){
      console.log(formatBytes(openPdf.FilePath.size))
      const bookName:string = openPdf.FileName.replace(/ /g, '');
      if(window.localStorage.getItem(bookName) === null){
        window.localStorage.setItem(bookName, "1");
        setPageNumber(1);
      }else{
        setPageNumber(parseInt(window.localStorage.getItem(bookName) || "1"))
      }
    }


    setTimeout(()=>{
      const settingsButton = document.querySelector(".settingsBtn");
      console.log(settingsButton?.shadowRoot?.innerHTML)
      if(settingsButton?.shadowRoot){
        settingsButton.shadowRoot.querySelector('.button-native')?.removeAttribute("href")
      }
    }, 1000)
  }, [openPdf.FileName]);

  // on page next prev happaned
  useEffect(()=> {
    if(openPdf.FileName){
      const bookName:string | null = openPdf.FileName.replace(/ /g, '') || null;
      if(bookName){
        let textContainer:HTMLElement | null = document.getElementById("textContent");
        if(textContainer){
          textContainer.innerHTML = "";
        }
        window.localStorage.setItem(bookName, pageNumber.toString());
      }
    }
    
  }, [pageNumber, openPdf.FileName])


  const getText = (page:PDFPageProxy) => {
    var fixFont = (fontHeight:number)=>{
        if(fontHeight <= 10){
            return 18
        }else if(fontHeight > 14 && fontHeight <30){
            return 26
        }else if(fontHeight >= 30){
            return 30
        }else{
            return 20
        }
    }
    var textContainer = document.getElementById("textContainer");
    page.getTextContent().then((textContent)=>{
        console.log(textContent)
        
        var text = "";
        var lastY= -1;
        textContent.items.forEach((item, i) => {
            if(lastY !== item.transform[5]){
                if(lastY - item.transform[5] > 1){
                    text +="<br /> "
                }
                lastY = item.transform[5];
            }
            text += `
            <span class="textChild" 
              style="font-family: ${settings.fontName}; 
              font-size: ${fixFont(item.height)}px

            ">${item.str}
            </span>`;
            if(i===textContent.items.length-1){
              if(textContainer){
                textContainer.innerHTML = text;
              }
            }
            
        });
    })
  }


  return (
    <IonPage>
      <IonToolbar mode="ios" slot="start" color={settings.modeColor==="dark" && settings.TextOnly? "dark":"light"}>
        <IonButtons>
          <IonButton color="dark">
            <IonIcon icon={listSharp}></IonIcon>
          </IonButton>
            <IonLabel class="bookTitleLabel">{openPdf.FileName}</IonLabel>
          <IonButton color="dark">
            <IonIcon icon={
              fileExists ? cloudDoneSharp : cloudOfflineSharp
            }></IonIcon>
          </IonButton>
        </IonButtons>

        <IonButtons slot="end">
          <IonLabel color="primary">zoom</IonLabel>
          <IonButton onClick={()=>setScale(scale-0.1)}>
            <IonIcon icon={removeCircleOutline}></IonIcon>
          </IonButton>
          <IonButton onClick={()=>setScale(scale+0.1)}>
            <IonIcon icon={addCircleOutline}></IonIcon>
          </IonButton>
          <IonButton  slot="end" onClick={()=>setShowJumpInput(!showJumpInput)}>
              {`${pageNumber}/${numPages}`}
          </IonButton>
        </IonButtons>
      </IonToolbar>
      
      <IonContent fullscreen class="contentContainer" 
        color={settings.modeColor==="dark" && settings.TextOnly? "dark":"light"}
        >
        <div id="textContainer" style={{
            display: `${settings.TextOnly?"block":"none"}`,
            backgroundColor: `${modeColorMaker(settings.modeColor || "white").background}`,
            color: `${modeColorMaker(settings.modeColor || "white").color}`
          }}></div>

        <div className="pdfContaner" style={{display: `${settings.TextOnly?"none":"block"}`}}>
          <Document
            file={openPdf.FileUrl?openPdf.FileUrl:openPdf.FilePath}
            className="document"
            renderMode="canvas"
            onLoadSuccess={(doc)=>{onDocumentLoadSuccess(doc)}}
            loading={()=>(
              <IonLoading isOpen={true} message="Getting your book" />
            )}
          >
            {/* <Outline></Outline> */}
            <Page pageNumber={pageNumber}
              width={window.innerWidth-20}
              height={window.innerHeight}
              renderAnnotationLayer={false}
              renderTextLayer={true}
              scale={scale}
              onLoadSuccess={(page)=>getText(page)}
            ></Page>
            
          </Document>
        </div>

        <IonFab class="prevBtn" onClick={()=>handleNavigationPage("prev")} vertical="center" horizontal="start" slot="fixed">
          <IonFabButton color="light">
            <IonIcon icon={chevronBackOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonFab class="nextBtn" onClick={()=>handleNavigationPage("next")} vertical="center" horizontal="end" slot="fixed">
          <IonFabButton color="light">
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonAlert
          isOpen={showJumpInput}
          cssClass='my-custom-class'
          header={'Jump to page'}
          message={"Enter page number"}
          mode="ios"
          onDidDismiss={()=>setShowJumpInput(false)}
          inputs={[
            {
              name: 'jumpInput',
              type: 'number',
              value: pageNumber
            }
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setShowJumpInput(false)
              }
            },
            {
              text: 'Ok',
              handler: (alertData) => {
                setPageNumber(parseInt(alertData.jumpInput))
              }
            }
          ]}
        />





    <IonToast color ="tertiary"
      isOpen={showToast.show}
      onDidDismiss={() => setShowToast({show: false, msg: ""})}
      message={showToast.msg}
      position="top"
      duration={2500}
      // translucent={true}
      mode="ios"
    />
    </IonPage>
  );
};

export default TabPdfViewer;
