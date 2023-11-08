import React, {useState} from 'react';
import emailjs from '@emailjs/browser';

function EmailForm() {

//states to manage the email
const [name, setName] =useState(' ');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');


const handleSubmit = (e) => {
e.preventDefault();
}


//important info, to be added to env later
const serviceId = 'service_l25pbuo';
const publicKey = 'ZBAefpbhwqQF0KbE6';
const templateId = 'template_face5xg'


//create an object with template parameters
const template= {
from_name: name,
from_email: email,
to_name: 'Verify-Id',
message: message,
};

emailjs.send(template, publicKey, serviceId, templateId)
.then((response) => {
    console.log('Email was sent successfully',response);
    setName('');
    setEmail('');
    setMessage('');
    
})
  .catch((error) => {
    console.error('Error sending email', error)

  });



  return (
    <form onSubmit={handleSubmit} className='emailform'>
      <input 
      type='text' 
      placeholder='Add Name'
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
     <input 
      type='email' 
      placeholder='Add Email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <textarea 
      cols="30"
      rows="10"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
       >
      </textarea>
      <button type='submit'>Send Email</button>
     
    </form>
  );
};

export default EmailForm
