import { forwardRef } from 'react';
import QRCode from 'qrcode.react';

const QRCodeLabel = forwardRef(({ articleName, articleNumber }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        padding: '10px',
        border: '1px solid #ccc',
        width: '80mm',
        textAlign: 'center',
      }}
    >
      <QRCode value={`${articleName} - ${articleNumber}`} size={150} />
      <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{articleName}</p>
      <p style={{ margin: '5px 0' }}>Article Number: {articleNumber}</p>
    </div>
  );
});

export default QRCodeLabel;
