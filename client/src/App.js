import "./App.css";
import NavBar from "./components/nav-bar";
import Users from "./components/users";
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes, Link } from 'react-router-dom';
import UserForm from "./components/userform";
import FruitProfile from "./components/fruitprofile";
import ParticlesBackground from "./components/particlesbackground";
import UserProfile from "./components/userprofile";
import { useState } from "react";

function App() {
  const [newUserId, setNewUserId] = useState(null);
  const [newUser, setNewUser] = useState({id:"13", first_name:"Sam", last_name:"Browm", username:"test", email:"test@gmail.com" , password:"test"});

  const { user } = useAuth0();
  
  

  return (
    <div id="app" className="d-flex flex-column h-100">
      <ParticlesBackground />
      <NavBar />
    
   
      <div className="container flex-grow-1">
      {!user ? <span>Hello from Samelia's Final Project!</span> : <span>Hello <Link to="api/me">{user.name}</Link></span> }
      <Routes>
      <Route path="/" element={<Users user={user}/>} />
      <Route path="api/form" element={<UserForm user={user} setNewUser={setNewUser} newUser={newUser} />} />
      <Route path="/fruitprofile" element={<FruitProfile/>} />
      <Route path="/profile" element={<UserProfile userId={newUserId} newUser={newUser} setNewUser={setNewUser} setNewUserId={setNewUserId}  />} />

      </Routes>
      </div>
    </div>
  );
}

export default App;
