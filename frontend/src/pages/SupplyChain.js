import React from 'react';
import { useParams } from 'react-router-dom';

const SupplyChain = () => {
  const { qrCode } = useParams();
  
  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <h1>Supply Chain History</h1>
      <p>QR Code: {qrCode}</p>
      <div className="card">
        <div className="card-body">
          <p>Supply chain timeline will be displayed here.</p>
          <p>This will show the complete journey of the product from farm to consumer.</p>
        </div>
      </div>
    </div>
  );
};

export default SupplyChain;
