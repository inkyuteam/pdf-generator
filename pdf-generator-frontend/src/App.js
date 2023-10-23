import { PDFViewer } from '@react-pdf/renderer';
import './App.css';
import PageToPDF from './components/PageToPDF';
import PDF from './components/create-template';

const data = {
  companyName: "Blank Labs",
  companyPhone: "555-555-5555",
  companyEmail: "hello@blanklabs.dev",
  receiptNumber: "101445",
  datePaid: "1/4/2022",
  paymentMethod: "Visa",
  amount: "$29.99"
}

function App() {
  return (
    <>
      {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <PDFViewer width="900px" height="800px">
          <PDF data={data}/>
        </PDFViewer>
      </div> */}
      <PageToPDF data={data}/>
    </>
    
    // <PageToPDF />
  );
}

export default App;
