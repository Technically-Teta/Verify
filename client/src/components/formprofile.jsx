import React from 'react'
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "./styles.css";




function FormProfile() {

const {

  register,
  handleSubmit,
  watch,
  formState: { errors }
  } = useForm();
}


const onSubmit = (data) => {
  alert(JSON.stringify(data));
  }; // onsubmit will invoke after successful validation

  console.log(watch("example")); 





  return (
    <div>
     
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <label>Username</label>a
      <input {...register("username", { pattern: /^[A-Za-z]+$/i })} />
      {errors.username && (
        <p>Use a mix of letters and numbers for your username</p>
      )}
      <label>Email</label>
      <input
        {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
      {errors.mail && <p role="alert">{errors.mail.message}</p>}


  


      <input type="submit" />
    </form>



    </div>
  )


export default FormProfile
