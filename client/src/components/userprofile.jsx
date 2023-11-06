import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';

// Component to manage the new user who is added to the app
// Passes in the props
const UserProfile = ({ userId, newUser, setNewUser }) => {
  useEffect(() => {
    if (!newUser) {
      fetch(`/api/users/${newUser.id}`)
        .then(response => response.json())
        .then(data => setNewUser(data));
    }
  }, [userId, newUser, setNewUser]);

  return (
    <div>
      
        <Table striped bordered hover>
          <thead>
            <tbody>
              <tr>
               
                <th>First Name: {newUser.first_name}</th>
                <th>Last Name: {newUser.last_name}</th>
                <th>Username: {newUser.username}</th>
                <th>Email: {newUser.email}</th>
                <th>Password: {newUser.password}</th>
              </tr>
            </tbody>
          </thead>
        </Table>
     
        <div>New user created with ID {userId}</div>
     
    </div>
  );
};

export default UserProfile;
