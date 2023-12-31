import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {Routes,Route, useNavigate} from 'react-router-dom'
import UserProfile from './userprofile';
 

const UserForm  = ({setProfileUser})=> {
  //creates the navigate function to apply to routers
   const navigate =useNavigate() 
  
  //function to navigate to the user profile
  const navigateToProfile = () =>{
    setProfileUser(userForm);
    navigate('/userprofile');
  };


 // variable to hold the initital user info which will be empty fields for input assigned to props
const initialUser = {id:"", first_name:"", last_name:"", username:"", email:"" , password:""};
console.log(initialUser)

 // This is the intital state  of the form

      const [userForm, setUserForm] = useState(initialUser);
      const [submitMessage, setSubmitMessage] = useState(''); // State for the submit message
      //passes the newUser prop to the userprofile
      const [newUserId, setNewUserId] = useState(null);
      const [newUser, setNewUser] = useState(null); // Initialize with null or an appropriate default value


//create functions that handle the event of the user typing into the form
const handleFirstNameChange = (event) => {
  const first_name = event.target.value;
  setUserForm((userForm) => ({ ...userForm, first_name }));
};

  const handleLastnameChange = (event) => {
    const last_name = event.target.value;
    setUserForm((userForm) => ({ ...userForm, last_name }));
  };

  const handleUserNameChange = (event) => {
    const username = event.target.value;
    setUserForm((userForm) => ({ ...userForm, username }));
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setUserForm((userForm) => ({ ...userForm, email }));
  };


  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setUserForm((userForm) => ({ ...userForm, password }));
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
      setNewUser(data);
      setSubmitMessage('User information submitted successfully') ; // Set the success message (change to different color)
      setUserForm(initialUser); // Clear the form
    })
    .catch((error) => {
      console.error('Error submitting user information', error);
      setSubmitMessage('Error submitting user information'); // Set an error message
    });
};


  //A function to handle the Update request(PUT)
const updateUser = (existingUser)=>{
  return fetch(`api/users/${existingUser.id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(existingUser)
  }).then((response) => {
    return response.json()
}).then((data) => {
  console.log("Hello I am the put request", data);
 setNewUser(data);
});
}


// submit the form for updates and for changes(post) 
const handleSubmit = (e) => {
  e.preventDefault();
  setNewUser(false);
  setNewUserId(newUserId);
  
  console.log(newUser)
  if(userForm.id){
    updateUser(userForm);
  }else{
    postUser(userForm)
  }
  };   

 

  return (
    <div>  
      <div className="signup"   >
      
        <h2>Sign up for an Account here!</h2> 

         <br />
       <div className='personicon'>      
       <FontAwesomeIcon icon={faUser} size="2xl" style={{color: "#36d3d0",}} />  
       </div>
        
    
     
      </div>
    
      <form className='formprofile' onSubmit={handleSubmit}>
      <label>First Name</label>
      <input
      type='text'
      id='add-user'
      placeholder='First Name'
      required
      value={userForm.first_name}
       onChange={handleFirstNameChange}
      />

     <label>Last Name</label>
      <input
      type='text'
      id='add-last'
      required
      value={userForm.last_name}
       onChange={handleLastnameChange}
      
      />
      
      <label>Username</label>
      <input
      type='text'
      id='add-username'
      required
      value={userForm.username}
       onChange={handleUserNameChange}
      
      />
      
      <label>Email</label>
      <input
      type='text'
      id='add-email'
      value={userForm.email}
       onChange={handleEmailChange}
      
      />
      
      <label>Password</label>
      <input
      type='text'
      id='add-password'
      required
      value={userForm.password}
       onChange={handlePasswordChange}
      
      />
      
      <input onClick={navigateToProfile} type='submit'/> <span className='submitbtn' style={{ color: 'green' }}>{submitMessage && <p>{submitMessage}</p>} </span>
      
      <Routes>
      <Route path="/userprofile" element={<UserProfile userId={newUserId} newUser={newUser} setNewUser={setNewUser} setNewUserId={setNewUserId}  />} />
      </Routes>


    </form>
    

   </div>
)}


export default UserForm
