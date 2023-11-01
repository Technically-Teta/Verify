import React, { useState , useEffect} from 'react'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
 

const FormProfile = (props)=> {
  const {
    handleSubmit,
    register,
   
    formState: { errors }
  } = useForm();

 // variable to hold the initital user info which will be empty fields for input assigned to props
const {inititalUser} = {id:"", first_name:"", last_name:"", username:"", email:"" , password:""}

 // This is the intital state  of the form
const [user, setUser] = useState(inititalUser);

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
const onSubmit = (e) => {
  e.preventDefault();
  if(user.id){
    updateUser(user);
  }else{
    postUser(user)
  }
  };   

 
useEffect(() => {
  postUser();
}, []);


useEffect(() => {
  postUser();
}, []); // 


  return (
    <div>  
      <div className="signup">
      <h2>Sign up for an Account here!</h2> 
        
      <FontAwesomeIcon icon={faUser} size="2xl" style={{color: "#36d3d0",}} />  
     
      </div>
    <form className='formprofile' onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input
       onChange={handleFirstNameChange}
        {...register("first_name", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
        })}
      />

      {errors?.first_name?.type === "required" && <p>This field is required</p>}
      {errors?.first_name?.type === "maxLength" && (
        <p>First name cannot exceed 20 characters</p>
      )}
      {errors?.first_name?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}
      <label>Last Name</label>
      <input onChange={handleLastnameChange} {...register("last_name", { pattern: /^[A-Za-z]+$/i })} />
      {errors?.last_name?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}
      <label>Username</label>
      <input onChange={handleUserNameChange} {...register("username", { pattern: /^[a-zA-Z0-9]+$/i })} />
      {errors.username && (
        <p>Use a mix of letters and numbers for your username</p>
      )}
      <label>Email</label>
      <input onChange={handleEmailChange}
        {...register("email", { required: "Email Address is required" })}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}
      <label>Password</label>
      <input onChange={handlePasswordChange} {...register("password", {pattern: /^[a-zA-Z0-9]{8,}$/})} />
      {errors.password && (
        <p>Password must be min 8 letters or numbers mix</p>
      )}
      <input type='submit' />
      
      
    </form>
   
   </div>
)}


export default FormProfile
