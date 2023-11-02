import React from 'react'
import Table from 'react-bootstrap/Table';



//Component to manage the new user who is added to the app 
//Passes in the props 
const Userprofile = ({userId,newUser}) =>{

 //sets state to control actions if user is added   
const [user, setUser] = useState(null)

// checks whether the newUser state variable is falsy (undefined or null).
useEffect(() =>{
    if(!newUser){
        fetch(`/api/users/${userId} `)
            .then(response => response.json())
            .then(data => setUser(data));
        }
    }, [userId, newUser]);
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    if (newUser) {
      return <div>New user created with ID {userId}</div>;
    }






  return (
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name: {user.first_name}</th>
          <th>Last Name: {user.last_name}</th>
          <th>Username: {user.username}</th>
          <th>Email: {user.email}</th>
          <th>Password: {user.password}</th>
        </tr>
      </thead>
      <tbody>



      </tbody>
      </Table>

      
    </div>
  )
}

export default Userprofile
