import React, { useRef } from 'react';
import axios from 'axios';

function PageToPDF({data}) {
  const pageRef = useRef();
  const pdfLinkRef = useRef(); 

  const handleGeneratePDF = async () => {
    const pageContent = pageRef.current.innerHTML;
    const requestData = {
      pageContent: pageContent
    };
    axios.post('http://localhost:3001/generate-pdf', requestData, {
      headers: {
          'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    })
    .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'your-filename.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error(error);
    });

  };

  return (
    <div>
      <div ref={pageRef}>
        <div style={{background: '#E4E4E4', width: '100%', height: '300px'}}>
          <div style={{margin: '10px', padding: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{flex: 1}}>
                <div style={{fontSize: 24, fontWeight: 600, color: '#131925', marginBottom: '8px'}}>{data.companyName}</div>
                <div style={{fontSize: 12, color: '#212935', lineHeight: '1.67'}}>{data.companyPhone}</div>
                <div style={{fontSize: 12, color: '#212935', lineHeight: '1.67'}}>{data.companyEmail}</div>
              </div>
              <div style={{flex: 1, alignItems: 'flex-end'}}>
                <div style={{fontSize: 24, fontWeight: 600, color: '#131925', marginBottom: '8px'}}>Receipt</div>
                <div style={{fontSize: 12, color: '#212935', lineHeight: 1.67}}>Receipt number: {data.receiptNumber}</div>
                <div style={{fontSize: 12, color: '#212935', lineHeight: 1.67}}>Date paid: {data.datePaid}</div>
                <div style={{fontSize: 12, color: '#212935', lineHeight: 1.67}}>Payment method: {data.paymentMethod}</div>
              </div>
            </div>
            <div style={{width: '100%', height: '1px', background: '#999999', margin: '24px 0 24px 0'}}></div>
            <div>
                <div style={{fontSize: 20, color: '#131925', lineHeight: '1.4', marginBottom: '4px'}}>$29.99 paid on {data.paymentMethod}</div>
                <div style={{fontSize: 12, color: '#212935', lineHeight: '1.67'}}>Thank you for your business!</div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
      <a href="#" ref={pdfLinkRef} style={{ display: 'none' }}>
        Download PDF
      </a>
    </div>
  );
}

export default PageToPDF;
