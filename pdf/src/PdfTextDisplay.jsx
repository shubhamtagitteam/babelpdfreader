// import React from 'react';

// const PdfTextDisplay = ({ extractedText }) => {
//   // Format paragraphs with double line breaks
//   const formattedText = extractedText.split('\n\n').map((paragraph, index) => (
//     <p key={index} style={{ marginBottom: '10px', fontSize: '16px' }}>
//       {paragraph}
//     </p>
//   ));

//   // Highlight a specific keyword (e.g., 'React')
//   const keyword = 'React';
//   const regex = new RegExp(keyword, 'gi');
//   const highlightedText = extractedText.replace(regex, (match) => `<span style="color: red;">${match}</span>`);

//   // Cleaned text without leading or trailing whitespace
//   const cleanedText = extractedText.trim();

//   return (
//     <div>
//       <h2>Formatted Text:</h2>
//       {formattedText}

//       <h2>Highlighted Text:</h2>
//       <div dangerouslySetInnerHTML={{ __html: highlightedText }} />

//       <h2>Cleaned Text:</h2>
//       <p>{cleanedText}</p>
//     </div>
//   );
// };

// export default PdfTextDisplay;
