import "./App.css";
import { Helmet } from 'react-helmet';
import Users from "./components/users";
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes, Link } from 'react-router-dom';
import UserForm from "./components/userform";
import UserProfile from "./components/userprofile";
import SVGAnimation from "./components/svganimation";
import OrgForm from "./components/orgform";
import EmailForm from "./components/emailform";



function App() {
  
  

  // const [newUserId, setNewUserId] = useState(null);
  // const [newUser, setNewUser] = useState({id:"", first_name:"", last_name:"", username:"", email:"" , password:""});
  // <Route path="/" element={<Users user={user}/>} />
  // <Route path="api/form" element={<UserForm user={user} setNewUser={setNewUser} newUser={newUser} />} />
  // <Route path="/fruitprofile" element={<FruitProfile/>} />
  // <Route path="/userprofile" element={<UserProfile userId={newUserId} newUser={newUser} setNewUser={setNewUser} setNewUserId={setNewUserId}  />} />
  // <Route path="users" component={Users} />
  // <Route path="/org-form" component={OrgForm} />
  // <Route path="/emailform" component={EmailForm} />

  const { user } = useAuth0();
  
  

  return (
    <div id="app" className="d-flex flex-column h-100">
     <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Merriweather:ital,wght@1,700&family=Nabla&family=Poppins:wght@200;300&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <h1 className="text-3xl font-bold ">
      Verify-ID
      </h1>

     




      <div className="container flex-grow-1">

      {!user ? <span>Hello from Samelia's Final Project!</span> : <span>Hello <Link to="api/me">{user.name}</Link></span> }
      <Routes>
      <Route path="/" element={<Users user={user}/>} />
      <Route path="/userform" element={<UserForm />} />
      <Route path="/userprofile" element={<UserProfile userId={newUserId} newUser={newUser} setNewUser={setNewUser} setNewUserId={setNewUserId}  />} />
      <Route path="users"        element={<Users        />} />
      <Route path="/org-form" element={<OrgForm />} />
      <Route path="/emailform" element={<EmailForm/>} />
     
   
   
      </Routes>
      <SVGAnimation />
      </div>
    </div>
  );
}

export default App;
