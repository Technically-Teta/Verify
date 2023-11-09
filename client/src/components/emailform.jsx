import React, {useState} from 'react';


function EmailForm() {

//states to manage the email
const [name, setName] =useState(' ');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');


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
