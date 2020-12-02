import React from 'react';
import { IonContent, IonPage, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { SetOpenPdf } from '../redux/Actions/GeneralActions';
import {Document, Page, pdfjs} from 'react-pdf';
import Panzoom from '@panzoom/panzoom'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// import './Tab3.css';

const TabPdfViewer: React.FC = () => {
  const dispatch = useDispatch();

  useIonViewWillLeave(()=>{
    dispatch(SetOpenPdf({
      Pdf_Opened: false,
      FilePath: "",
      FileName: ""
    }))
  });

  const openPdf = useSelector((state:any) => state.openPdf);

  // On pdf document loaded event

  const onDocumentLoadSuccess = (numPages: any) => {
    setTimeout(()=>{
      const element  = document.getElementById("scene") as HTMLElement ;

      const panzoom = Panzoom(element, {
        maxScale: 5,
        panOnlyWhenZoomed: false,
        step: 1,
        isSVG: true,
        contain: true
      });

      // element.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
    })
  }


  return (
    <IonPage>
      <IonContent fullscreen>
        <div id="scene" style={{height: "100%"}}>
        <Document
          file={openPdf.FilePath}
          renderMode="svg"
          onLoadSuccess={()=>onDocumentLoadSuccess({numPages: 0})}
        >
          <Page pageNumber={6}
            width={window.innerWidth}
            height={window.innerHeight}
            renderAnnotationLayer={false}
          ></Page>
          
        </Document>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TabPdfViewer;
