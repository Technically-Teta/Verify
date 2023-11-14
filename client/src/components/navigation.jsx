import React from 'react';
import AuthNav from './auth-nav';
import { Link } from 'react-router-dom';
import verifyid from "../assets/verifyid.png";


const Navigation = () => {
  return (
    <nav id='menu' className='navbar'>
      <div className='container'>

      <img className='img' src={verifyid} alt="Logo" />;

        <div className='navbar-header'>
        
        <AuthNav />
          
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
            <Link to="/userform" className='page-scroll'>
               User Profile
             </Link>
            </li>
            <li>
            <Link to="/userProfile" className='page-scroll'>
               New User
             </Link>
            </li>

            <li>
              <Link to= '/volunteerorgform' className='page-scroll'>
                Get your QR to verify!
            </Link>
            </li>
            <li>
          <Link to='/about 'className='page-scroll'>
                About
          </Link>
            </li>
           
            <li>
              <Link to="/contactform" className='page-scroll'>
               Contact
              </Link>
           
            </li>
            
           
            
          
             
             



          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
