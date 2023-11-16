import React from 'react'

function SubmissionqrId() {

  const [qrCode, setQRCode] = useState('');

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch('/api/QR');
        if (!response.ok) {
          throw new Error('Failed to fetch QR code');
        }

        const qrData = await response.json();
        setQRCode(qrData); 
      } catch (error) {
        console.error('Error fetching QR code:', error);
        
      }
    };

    fetchQRCode();
  }, []);  

  return (
    <div>
      {/* Render the QR code in your component */}
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>






      
    
  )
}

export default SubmissionqrId
