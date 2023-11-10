import emailjs from 'emailjs-com';
import {useState} from 'react'

function EmailForm() {

  // States to manage the email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

 // function to send email on submission
 const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.init(data.publicKey); 
    // Create an object with template parameters
     const template = {
        from_name: name,
        from_email:'Verify-Id',
        to_name: email,
        message: {
          data: message,
         }, 
      };
      console.log(template);
    };
   console.log(name, email,message,template);
    
// API functions
  emailjs 
    .send(data.publicKey, data.templateId, template)
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
