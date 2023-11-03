import React from 'react'
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';


//Component to manage the new user who is added to the app 
//Passes in the props 
const Userprofile = ({userId,newUser,setNewUser}) =>{



// checks whether the newUser state variable is falsy (undefined or null).
useEffect(() =>{
    if(!newUser){
        fetch(`/api/users/${newUser.id} `)
            .then(response => response.json())
            .then(data => setNewUser(data));
        }
    }, [userId, newUser]);
  

  
    if (newUser) {
      return <div>New user created with ID {userId}</div>;
    }






  return (
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name: {newUser.first_name}</th>
          <th>Last Name: {newUser.last_name}</th>
          <th>Username: {newUser.username}</th>
          <th>Email: {newUser.email}</th>
          <th>Password: {newUser.password}</th>
        </tr>
      </thead>
      <tbody>



      </tbody>
      </Table>

      
    </div>
  )
}

export default Userprofile
