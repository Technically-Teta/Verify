import React,{useState} from 'react'
import axios from 'axios';


async function generateQRCode(text) {
  const response = await axios.get(`https://api.qrcode-generator.com/generate?text=${text}`);
  const qrcodeImage = response.data;
  return qrcodeImage;
}

// When user clicks on Fill out org form this opens 
function QRgenerator() {
  const [qrcodeImage, setQRCodeImage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const generateQRCodeHandler = async () => {
    const qrcodeImage = await generateQRCode('http://localhost:3000/volunteerorgform');
    setQRCodeImage(qrcodeImage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const qrcode = formData.get('qrcode');

    // Submit the form to the backend
    await axios.post('http://localhost:3000/volunteerorgform/submit-form', { qrcode });

    setFormSubmitted(true);
  };

  return (
    <div>
      {formSubmitted ? (
        <div>
          <h1>Form submitted successfully!</h1>
        </div>
      ) : (
        <div>
          <button onClick={generateQRCodeHandler}>Generate QR Code</button>
          {qrcodeImage && (
            <img src={qrcodeImage} alt="QR Code" />
          )}
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="qrcode" value={qrcodeImage} />
            <input type="submit" value="Submit Form" />
          </form>
        </div>
      )}
    </div>
  );
}


export default QRgenerator
