import { useState } from 'react';

function EmailForm() {
  // States to manage the email
  const [name, setName] = useState(' ');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Important info, to be added to env later
    const data = {
      serviceId: 'service_l25pbuo',
      publicKey: 'ZBAefpbhwqQF0KbE6',
      templateId: 'template_face5xg',
    };
    console.log(data);

    // Create an object with template parameters
    const template = {
      from_name: name,
      from_email: email,
      to_name: 'Verify-Id',
      message: {
        data: message,
      },
    };
    console.log(template);

    const postEmail = (template) => {
      return fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log('Email was sent successfully', data);
          setName('');
          setEmail('');
        })
        .catch((error) => {
          console.error('Error submitting email', error);
          setMessage('Error submitting email'); // Set an error message
        });
    };

    // Call the postEmail function to send the email
    postEmail(template);
  };

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
      <textarea className='textarea'
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
