import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
 

const FormProfile = (props)=> {


 // variable to hold the initital user info which will be empty fields for input assigned to props
const {inititalUser = {id:"", first_name:"", last_name:"", username:"", email:"" , password:""}} = props;

 // This is the intital state  of the form
const [user, setUser] = useState(inititalUser);
const [submitMessage, setSubmitMessage] = useState(''); // State for the submit message

//create functions that handle the event of the user typing into the form
const handleFirstNameChange = (event) => {
  const first_name = event.target.value;
  setUser((user) => ({ ...user, first_name }));
};

  const handleLastnameChange = (event) => {
    const last_name = event.target.value;
    setUser((user) => ({ ...user, last_name }));
  };

  const handleUserNameChange = (event) => {
    const username = event.target.value;
    setUser((user) => ({ ...user, username }));
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setUser((user) => ({ ...user, email }));
  };


  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setUser((user) => ({ ...user, password }));
  };


  //A function to handle the post request

const postUser = (newUser) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('Hello, I am the post request', data);
      props.saveUser(data);
      setSubmitMessage('User information submitted successfully'); // Set the success message
      setUser(inititalUser); // Clear the form
    })
    .catch((error) => {
      console.error('Error submitting user information', error);
      setSubmitMessage('Error submitting user information'); // Set an error message
    });
};








  //A function to handle the Update request(PUT)
const updateUser = (existingUser)=>{
  return fetch(`/api/users/${existingUser.id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(existingUser)
  }).then((response) => {
    return response.json()
}).then((data) => {
  console.log("Hello I am the put request", data);
  props.saveUser(data);
});
}


// submit the form for updates and for changes 
const handleSubmit = (e) => {
  e.preventDefault();
  if(user.id){
    updateUser(user);
  }else{
    postUser(user)
  }
  };   

 


  return (
    <div>  
      <div className="signup">
      <h2>Sign up for an Account here!</h2> 
        
      <FontAwesomeIcon icon={faUser} size="2xl" style={{color: "#36d3d0",}} />  
     
      </div>
    <form className='formprofile' onSubmit={handleSubmit}>
      <label>First Name</label>

      <input
      type='text'
      id='add-user'
      placeholder='First Name'
      required
      value={user.first_name}
       onChange={handleFirstNameChange}
      />

     <label>Last Name</label>
      <input
      type='text'
      id='add-last'
      required
      value={user.last_name}
       onChange={handleLastnameChange}
      
      />
      
      <label>Username</label>
      <input
      type='text'
      id='add-username'
      required
      value={user.username}
       onChange={handleUserNameChange}
      
      />
      
      <label>Email</label>
      <input
      type='text'
      id='add-email'
      value={user.email}
       onChange={handleEmailChange}
      
      />
      
      <label>Password</label>
      <input
      type='text'
      id='add-password'
      value={user.email}
       onChange={handlePasswordChange}
      
      />
      
      <input type='submit' />{submitMessage && <p>{submitMessage}</p>} 
      
    </form>
    

   </div>
)}


export default FormProfile
