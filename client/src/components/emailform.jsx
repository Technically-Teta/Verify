import emailjs from 'emailjs-com';
import React, { useState } from 'react';

function EmailForm() {

  // States to manage the email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


const userID= process.env.REACT_APP_USER_ID
const templateID= process.env.REACT_APP_TEMPLATE
const serviceID= process.env.REACT_APP_SERVICE

emailjs.init(userID); 

 // function to send email on submission
 const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an object with template parameters
   console.log(name, email,message);
};

const template = {
    from_name: name,
    from_email:'Verify-Id',
    to_name: email,
    message: {
      data: message,
     }, 
  };
  console.log(template);


// API functions
  emailjs 
    .send(serviceID, templateID, template)
    .then(
        function(response) {
            console.log("sent successfully", response.status,response.text);
        },
        function (error) {
            console.log("DELIVERY FAILED", error)
        }

    );
      

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
        placeholder='Send custom message to community service organization'
        cols='30'
        rows='10'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button type='submit'>Send Email</button>
    </form>
  );
}

export default EmailForm;
