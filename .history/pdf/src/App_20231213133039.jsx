// // App.js
// import React, { useState } from "react";
// import "./App.css";
// import { Document, pdfjs ,Page } from "react-pdf";
// import TrafficCrashReport from "./TrafficCrashReport"; // Import your TrafficCrashReport component
// // import PdfTextDisplay from "./PdfTextDisplay";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// function App() {
//   const [file, setFile] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [displayText, setDisplayText] = useState("");
//   const [pdfData, setPdfData] = useState(null); // Added state for extracted data

//   const onFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setDisplayText("");
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const handleButtonClick = async () => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const loadingTask = pdfjs.getDocument({
//           data: new Uint8Array(reader.result),
//         });
//         const pdf = await loadingTask.promise;
//         let pdfText = "";

//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const textContent = await page.getTextContent();
//           pdfText += textContent.items.map((s) => s.str).join(" ");
//         }

//         setDisplayText(pdfText);

//         // Pass the extracted text to TrafficCrashReport component
//         // and let it handle further processing
//         setPdfData(pdfText);
//       };

//       reader.readAsArrayBuffer(file);
//     }
//   };

//   const handleNextPage = () => {
//     setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
//   };

//   const handlePrevPage = () => {
//     setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
//   };

//   return (
//     <div className="App">
//       <h1>React PDF Text Extractor</h1>
//       <input type="file" onChange={onFileChange} />
//       <button onClick={handleButtonClick}>Extract Text</button>
//       {file && (
//         <div>
//           {/* Display PDF document */}
//           {/* <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
//             <Page pageNumber={pageNumber} />
//           </Document> */}
//           <p>
//             Page {pageNumber} of {numPages}
//           </p>
//           {pageNumber > 1 && (
//             <button onClick={handlePrevPage}>Previous Page</button>
//           )}
//           {pageNumber < numPages && (
//             <button onClick={handleNextPage}>Next Page</button>
//           )}
//         </div>
//       )}
//       {/* Conditionally render the TrafficCrashReport component */}
//       {pdfData && <TrafficCrashReport pdfData={pdfData} />}
//       {displayText && <p>{displayText}</p>}
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { Worker, Viewer, pdfjs } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState('');

  const extractInformation = (text) => {
    const localReportNumberRegex = /LOCAL REPORT NUMBER\s*\*\s*([^\n]+)/i;
    const crashDateTimeRegex = /CRASH DATE \/ TIME\s*\*\s*([^\n]+)/i;
    const numberOfUnitsRegex = /NUMBER OF UNITS\s*\*\s*([^\n]+)/i;
    const numberInErrorRegex = /NUMBER IN ERROR\s*\*\s*([^\n]+)/i;
    const ownerNameRegex = /OWNER NAME\s*\*\s*([^\n]+)/i;
    const ownerAddressRegex = /OWNER ADDRESS\s*\*\s*([^\n]+)/i;

    const localReportNumberMatch = text.match(localReportNumberRegex);
    const crashDateTimeMatch = text.match(crashDateTimeRegex);
    const numberOfUnitsMatch = text.match(numberOfUnitsRegex);
    const numberInErrorMatch = text.match(numberInErrorRegex);
    const ownerNameMatch = text.match(ownerNameRegex);
    const ownerAddressMatch = text.match(ownerAddressRegex);

    const localReportNumber = localReportNumberMatch ? localReportNumberMatch[1].trim() : null;
    const crashDateTime = crashDateTimeMatch ? crashDateTimeMatch[1].trim() : null;
    const numberOfUnits = numberOfUnitsMatch ? numberOfUnitsMatch[1].trim() : null;
    const numberInError = numberInErrorMatch ? numberInErrorMatch[1].trim() : null;
    const ownerName = ownerNameMatch ? ownerNameMatch[1].trim() : null;
    const ownerAddress = ownerAddressMatch ? ownerAddressMatch[1].trim() : null;

    console.log('LOCAL REPORT NUMBER:', localReportNumber);
    console.log('CRASH DATE/TIME:', crashDateTime);
    console.log('NUMBER OF UNITS:', numberOfUnits);
    console.log('NUMBER IN ERROR:', numberInError);
    console.log('OWNER NAME:', ownerName);
    console.log('OWNER ADDRESS:', ownerAddress);

    // Do something with the extracted information
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const data = new Uint8Array(reader.result);
      const loadingTask = pdfjs.getDocument({ data });

      try {
        const pdf = await loadingTask.promise;
        let text = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          text += textContent.items.map((item) => item.str).join(' ');
        }

        setPdfText(text);
        setNumPages(pdf.numPages);

        // Extract information after setting the PDF text
        extractInformation(text);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
gh
      {pdfText && (
        <div>
          <h2>PDF Text:</h2>
          <p>{pdfText}</p>
        </div>
      )}

      {numPages && (
        <div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button onClick={() => setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1))}>
            Previous Page
          </button>
          <button onClick={() => setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages))}>
            Next Page
          </button>
        </div>
      )}

      <div style={{ width: '600px' }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
          <Viewer fileUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`} />
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;
