import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = ({ onScanSuccess, onScanError }) => {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);
  const html5QrcodeScannerRef = useRef(null);

  useEffect(() => {
    if (scanning && !html5QrcodeScannerRef.current) {
      // Add a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const element = document.getElementById("qr-reader");
        if (element) {
          html5QrcodeScannerRef.current = new Html5QrcodeScanner(
            "qr-reader",
            { 
              fps: 10, 
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0,
              showTorchButtonIfSupported: true,
              showZoomSliderIfSupported: true,
            },
            false
          );

          html5QrcodeScannerRef.current.render(
            (decodedText, decodedResult) => {
              console.log(`QR Code detected: ${decodedText}`);
              if (onScanSuccess) {
                onScanSuccess(decodedText, decodedResult);
              }
              // Stop scanning after successful scan
              stopScanning();
            },
            (errorMessage) => {
              // Handle scan errors silently (too many errors from continuous scanning)
              if (onScanError && !errorMessage.includes('NotFoundException')) {
                onScanError(errorMessage);
              }
            }
          );
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear().catch(error => {
          console.error("Failed to clear scanner:", error);
        });
        html5QrcodeScannerRef.current = null;
      }
    };
  }, [scanning, onScanSuccess, onScanError]);

  const startScanning = () => {
    setScanning(true);
  };

  const stopScanning = () => {
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.clear().catch(error => {
        console.error("Failed to clear scanner:", error);
      });
      html5QrcodeScannerRef.current = null;
    }
    setScanning(false);
  };

  return (
    <div style={{ width: '100%' }}>
      {!scanning ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ 
            fontSize: '64px', 
            marginBottom: '20px',
            color: 'var(--primary-color)'
          }}>
            📷
          </div>
          <h3>Scan QR Code</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Click the button below to start scanning a product QR code
          </p>
          <button 
            onClick={startScanning}
            className="btn btn-primary"
            style={{ padding: '12px 30px', fontSize: '16px' }}
          >
            Start Camera
          </button>
        </div>
      ) : (
        <div>
          <div id="qr-reader" ref={scannerRef} style={{ width: '100%' }}></div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={stopScanning}
              className="btn btn-secondary"
            >
              Stop Scanning
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
