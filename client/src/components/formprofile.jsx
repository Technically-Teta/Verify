import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const FormProfile = (props)=> {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

 // variable to hold the initital user info which will be empty fields for input assigned to props
const {inititalUser} = {id:null, first_name:"", last_name:"", username:"", email:"" , password:""}

 // This is the intital state  of the form
const [user, setUser] = useState(inititalUser);

//create functions that handle the event of the user typing into the form
const handleFirstNameChange = (event) => {
  const first_name = event.target.value;
  setUser((user) => ({ ...user, first_name }));

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
    const username = event.target.value;
    setUser((user) => ({ ...user, password }));
  };


  //A function to handle the post request
const postUser = (newUser) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"  },
    body: JSON.stringify(newUser)
  })
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log("Hello I am the post request", data);
      props.saveUser(data)
    })
}



  //A function to handle the Update request


// submit the form for updates and for changes 
const onSubmit = (data) => {
  alert(JSON.stringify(data));
  }; // onsubmit will invoke after successful validation

  console.log(watch("example")); 


  return (
    <div>
      <div className="signup">
      <h2>Sign up for an Account here!</h2> 
        
      <FontAwesomeIcon icon={faUser} size="2xl" style={{color: "#36d3d0",}} />  
     
      </div>
    <form className='formprofile' onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input
        {...register("first_name", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
        })}
      />
      {errors?.firstName?.type === "required" && <p>This field is required</p>}
      {errors?.firstName?.type === "maxLength" && (
        <p>First name cannot exceed 20 characters</p>
      )}
      {errors?.firstName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}
      <label>Last Name</label>
      <input {...register("last_Name", { pattern: /^[A-Za-z]+$/i })} />
      {errors?.lastName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}
      <label>Username</label>
      <input {...register("username", { pattern: /^[a-zA-Z0-9]+$/i })} />
      {errors.username && (
        <p>Use a mix of letters and numbers for your username</p>
      )}
      <label>Email</label>
      <input
        {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
      {errors.mail && <p role="alert">{errors.mail.message}</p>}
      <label>Password</label>
      <input {...register("password", {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})} />
      {errors.username && (
        <p>Password must be min 9 letters or numbers mix</p>
      )}
 
      <input type="submit" />
    </form>

    </div>
)}}


export default FormProfile
