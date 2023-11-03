import "./App.css";
import NavBar from "./components/nav-bar";
import Users from "./components/users";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/loading";
import { Route, Routes, Link } from 'react-router-dom';
import FormProfile from "./components/userform";
import FruitProfile from "./components/fruitprofile";
import ParticlesBackground from "./components/particlesbackground";
import Userprofile from "./components/userprofile";
import { useState } from "react";

function App() {
  const [newUserId, setNewUserId] = useState(null);
  const [newUser, setNewUser] = useState({id:"13", first_name:"Sam", last_name:"Browm", username:"test", email:"test@gmail.com" , password:"test"});

  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <ParticlesBackground />
      <NavBar />
      <FormProfile />
   
      <div className="container flex-grow-1">
      {!user ? <span>Hello from Samelia's Final Project!</span> : <span>Hello <Link to="api/me">{user.name}</Link></span> }
      <Routes>
      <Route path="/" element={<Users user={user}/>} />
      <Route path="api/form" element={<FormProfile user={user} setNewUser={setNewUser} newUser={newUser} />} />
      <Route path="/fruitprofile" element={<FruitProfile/>} />
      <Route path="/profile" element={<Userprofile userId={newUserId} newUser={newUser} setNewUser={setNewUser} setNewUserId={setNewUserId}  />} />

      </Routes>
      </div>
    </div>
  );
}

export default App;
