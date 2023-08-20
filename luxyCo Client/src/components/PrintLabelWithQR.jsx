import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import QRCodeLabel from './QRCodeLabel';
import '../sass/_QRCodeStyle.scss';

const PrintLabelsWithQR = ({ printData }) => {
  const componentRef = useRef();

  return (
    <div className="qr-container">
      <div className="qr-wrap">
        <QRCodeLabel
          ref={componentRef}
          className="tete1"
          articleName={printData.article_name}
          articleNumber={printData.article_number}
        />
        <ReactToPrint
          content={() => componentRef.current}
          trigger={() => <button>Print Label</button>}
        />
      </div>
    </div>
  );
};

export default PrintLabelsWithQR;
