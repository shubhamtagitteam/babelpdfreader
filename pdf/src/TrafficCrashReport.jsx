// // TrafficCrashReport.js
// import React, { useEffect } from 'react';

// const TrafficCrashReport = ({ pdfData }) => {
//   useEffect(() => {
//     // Use the pdfData prop
//     const text = pdfData;

//     // Define an array of regular expression patterns to match different information
//     const patterns = [
//       /LOCAL REPORT NUMBER \*(\S+)/,
//       /SECONDARY CRASH REPORTING AGENCY NAME \* (\w+)/,
//       /CRASH SEVERITY (\w+)/,
//       /COUNTY\* (\d+)/,
//       // Add more patterns as needed
//     ];

//     // Iterate through patterns
//     patterns.forEach((pattern) => {
//       // Use regex to find the match
//       const match = text.match(pattern);

//       // Check if a match is found
//       if (match) {
//         const matchedInfo = match[1];
//         console.log(`Matched information: ${matchedInfo}`);
//       } else {
//         console.log(`Pattern not matched: ${pattern}`);
//       }
//     });
//   }, [pdfData]); // Run this effect whenever pdfData changes

//   return <div>Check console for results</div>;
// };

//  export default TrafficCrashReport;


// import React, { useState, useEffect } from "react";

// const TrafficCrashReport = ({ pdfData }) => {
//   const [localReportNumber, setLocalReportNumber] = useState(null);

//   useEffect(() => {
//     // Regular expression to find the LOCAL REPORT NUMBER
//     const localReportNumberRegex = /LOCAL REPORT NUMBER \*([^ \n]+)/i;
//     const match = pdfData.match(localReportNumberRegex);

//     // Extract the LOCAL REPORT NUMBER if found
//     const extractedLocalReportNumber = match ? match[1] : null;

//     // Set the state with the extracted LOCAL REPORT NUMBER
//     setLocalReportNumber(extractedLocalReportNumber);
//   }, [pdfData]);

//   return (
//     <div>
//       <h2>Local Report Number:</h2>
//       <p>{localReportNumber || "Not available"}</p>
//     </div>
//   );
// };

// export default TrafficCrashReport;


// import React, { useState, useEffect } from "react";

// const TrafficCrashReport = ({ pdfData }) => {
//   const [formattedData, setFormattedData] = useState([]);

//   useEffect(() => {
//     // Assuming pdfData is an array of objects with LOCAL REPORT DATE
//     const extractedData = ['...']; // Extracted data from your PDF

//     // Sort the data based on LOCAL REPORT DATE
//     const sortedData = extractedData.sort((a, b) => new Date(a["LOCAL REPORT NUMBER"]) - new Date(b["LOCAL REPORT DATE"]));

//     // Format dates in a human-readable way
//     const formattedDates = sortedData.map(item => ({
//       ...item,
//       "LOCAL REPORT NUMBER": new Date(item["LOCAL REPORT NUMBER"]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
//     }));

//     setFormattedData(formattedDates);
//   }, [pdfData]);

//   return (
//     <div>
//       <h2>Sorted and Formatted Data:</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>LOCAL REPORT NUMBER</th>
//             {/* Add more table headers for other fields */}
//           </tr>
//         </thead>
//         <tbody>
//           {formattedData.map((item, index) => (
//             <tr key={index}>
//               <td>{item["LOCAL REPORT NUMBER"]}</td>
//               {/* Add more table cells for other fields */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TrafficCrashReport;



// import React, { useState, useEffect } from "react";

// const TrafficCrashReport = ({ pdfData }) => {
//   const [formattedData, setFormattedData] = useState([]);

//   useEffect(() => {
//     // Assuming pdfData is an array of objects with report and victim data
//        const extractedData = ['...']; // Extracted data from your PDF
//     // const extractedData = [...pdfData];

//     // Sort the data based on report_id
//     const sortedData = extractedData.sort((a, b) => a.report_id - b.report_id);

//     setFormattedData(sortedData);
//   }, [pdfData]);

//   return (
//     <div>
//       <h2>Formatted Data:</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Report ID</th>
//             <th>Unit Number</th>
//             <th>Owner Last Name</th>
//             <th>Owner First Name MI</th>
//             <th>Owner Address</th>
//             <th>Owner Phone</th>
//             {/* Add more table headers for other report fields */}
//             <th>Victim Seq</th>
//             <th>Victim Last Name</th>
//             <th>Victim First Name Middle</th>
//             <th>Victim Address</th>
//             <th>Victim Phone</th>
//             {/* Add more table headers for other victim fields */}
//           </tr>
//         </thead>
//         <tbody>
//           {formattedData.map((item, index) => (
//             <tr key={index}>
//               <td>{item.report_id}  sdgrsd</td>
//               <td>{item.unit_number} aswfd</td>
//               <td>{item.owner_name_last}</td>
//               <td>{item.owner_name_first_mi}</td>
//               <td>{item.owner_address}</td>
//               <td>{item.owner_phone}</td>
//               {/* Add more table cells for other report fields */}
//               <td>{item.seq}</td>
//               <td>{item.name_last}</td>
//               <td>{item.name_first_middle}</td>
//               <td>{item.address}</td>
//               <td>{item.phone} asdc</td>
//               {/* Add more table cells for other victim fields */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TrafficCrashReport;






// TrafficCrashReport.js
import React, { useEffect, useState } from "react";

const TrafficCrashReport = ({ pdfData }) => {
  const [crashInfo, setCrashInfo] = useState({
    localReportNumber: null,
    reportingAgencyName: null,
    crashDateTime: null,
  });

  useEffect(() => {
    // Implement the logic to extract crash information from pdfData
    // Replace this with your actual logic for extracting crash information
    const extractedCrashInfo = extractCrashInfoFromPdfData(pdfData);

    if (extractedCrashInfo) {
      setCrashInfo(extractedCrashInfo);
    } else {
      // If crash information is not available, set them to null
      setCrashInfo({
        localReportNumber: null,
        reportingAgencyName: null,
        crashDateTime: null,
      });
    }
  }, [pdfData]);

  const extractCrashInfoFromPdfData = (pdfData) => {
    const localReportNumberRegex = /LOCAL REPORT NUMBER\s*\*\s*([^\n]+)/i;
    const reportingAgencyNameRegex = /SECONDARY CRASH REPORTING AGENCY NAME\s*\*\s*([^\n]+)/i;
    const crashDateTimeRegex = /CRASH DATE \/ TIME\s*\*\s*([^\n]+)/i;

    const localReportNumberMatch = pdfData.match(localReportNumberRegex);
    const reportingAgencyNameMatch = pdfData.match(reportingAgencyNameRegex);
    const crashDateTimeMatch = pdfData.match(crashDateTimeRegex);

    if (localReportNumberMatch && reportingAgencyNameMatch && crashDateTimeMatch) {
      const localReportNumber = localReportNumberMatch[1].trim();
      const reportingAgencyName = reportingAgencyNameMatch[1].trim();
      const crashDateTime = crashDateTimeMatch[1].trim();
      return { localReportNumber, reportingAgencyName, crashDateTime };
    } else {
      console.error("Crash information not found in the extracted PDF data");
      return null;
    }
  };

  return (
    <div>
      <h2>Traffic Crash Report</h2>
      <p>
        {/* Display the extracted crash information in the UI or "null" if not available */}
        Local Report Number: {crashInfo.localReportNumber === null ? "null" : crashInfo.localReportNumber}
        <br />
        Reporting Agency Name: {crashInfo.reportingAgencyName === null ? "null" : crashInfo.reportingAgencyName}
        <br />
        Crash Date/Time: {crashInfo.crashDateTime === null ? "null" : crashInfo.crashDateTime}
      </p>
    </div>
  );
};

export default TrafficCrashReport;
