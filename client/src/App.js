import "./App.css";
import NavBar from "./components/nav-bar";
import Users from "./components/users";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/loading";
import { Route, Routes, Link } from 'react-router-dom';
import FormProfile from "./components/formprofile";
import FruitProfile from "./components/fruitprofile";
import ParticlesBackground from "./components/particlesbackground";
import Profile from "./components/profile";

function App() {

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
      <Route path="/" element={<ParticlesBackground user={user}/>} />
      <Route path="api/form" element={<FormProfile user={user}/>} />
      <Route path="/fruitprofile" element={<FruitProfile/>} />
      <Route path="/profile" element={<Profile/>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
