import * as React from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import "./styles.css";

export default function Experimental() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [file, setFile] = React.useState<File>();
  const [fileName, setFileName] = React.useState("");

  const handleFile = (
    e: React.ChangeEvent<{ value: string; files: FileList | null }>
  ) => {
    setFileName(e.target.value);
    if (e.target.files !== null) {
      console.log(e.target.files);
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={(e) => handleFile(e)} />
      <h2>File name: {fileName}</h2>

      <div
        style={{
          height: "calc(100% - 56px)",
          overflow: "scroll"
        }}
      >
        <div id="scene" style={{ height: "100%" }}>
          {
            <Document file={file} renderMode="svg" className="document">
              <Page
                // onLoadSuccess={(page)=>getText(page)}
                className="readerPage"
                renderAnnotationLayer={false}
                pageNumber={1}
              ></Page>
            </Document>
          }
        </div>
      </div>
    </div>
  );
}
