import { useState, useEffect } from "react";
import Form from "./form";

function Users(props) {
  let user = props.user;
  // this is my original state with an array of users
  const [users, setusers] = useState([]);

  // New State to contro the existing user Id that the user wants to edit
  const [edituserId, setEdituserId] = useState(null);

  const loadusers = () =>{
    // A function to fetch the list of users that will be load anytime that list change
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => {
            setusers(users);
          });
  }

  useEffect(() => {
    loadusers();
  }, []);

  //A function to handle the Delete funtionality
  const onDelete = (user) =>{
    return fetch(`/api/users/${user.id}`, {
      method: "DELETE"
    }).then((response) => {
      //console.log(response);
      if(response.ok){
        loadusers();
      }
    })
  }

  const adduser = (newuser) => {
    //console.log(newuser);
    //postuser(newuser);
    setusers((users) => [...users, newuser]);
  };

  //A function to control the update in the parent (user component)

  const updateuser = (saveduser) =>{
    console.log("Line 29 saveduser", saveduser);
    // This function should update the whole list of users - 
    setusers((users) => {
      const newArrayusers = [];
      for(let user of users){
        if(user.id === saveduser.id){
          newArrayusers.push(saveduser);
        } else {
          newArrayusers.push(user);
        }
      }
      return newArrayusers;
    })
    // This line is only to close the form;
    setEdituserId(null);
  }
  
  const onEdit = (user) =>{
    console.log("This is line 26 on user component", user);
    const editingID = user.id;
    console.log("Just the user id", user.id)
    setEdituserId(editingID);

  }

  return (
    <div className="users">
      <h2> List of users </h2>
      <ul>
        {users.map((user) => {
          if(user.id === edituserId){
            //something needs to happento allow the user edit that existing user
            // At some point I need to pass the update function as props - connect this to the backend
            return <Form initialuser={user} saveuser={updateuser}/>
          } else{
            return (
              <li key={user.id}>
           {user.first_name} {user.last_name} {user.username}{user.email}{user.password}
           <button type="button" onClick={() =>{onEdit(user)}}>EDIT</button>
           <button type="button" onClick={() =>{onDelete(user)}}>DELETE</button>
        </li>
            )
          }
        })}
      </ul>
      {!user ? (<h4>Please signup to add users to our DB </h4>) : (<Form saveuser={adduser} />)}
      
    </div>
  );
}

export default Users;
