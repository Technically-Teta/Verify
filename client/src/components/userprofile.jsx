import React from 'react';

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
      
     
        <div>New user created with ID {userId}</div>
     
    </div>
  );
};

export default UserProfile;
