import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({ user_id, newUser, setNewUser }) => {
  // starting state for drop down, opens at false (closed)
  const [open, setOpen] = useState(false);

  // Function to handle open state change
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOrgs = () => {
    setOpen(false);
  };

  const handleMenuVol = () => {

    setOpen(false);
  };

  //API request is made when userId is available and newUser is null
    useEffect(() => {
      if (user_id && newUser ===null) {
        fetch(`/api/users/${user_id}`)
          .then((response) => response.json())
          .then((data) => setNewUser(data));
      }
    }, [user_id, newUser, setNewUser]);
  

  return (
    <section className="relative py-14 bg-gray-900">
      <div
        className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      ></div>
      <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
        <div className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0">
          <h3 className="text-cyan-400 font-semibold">Hello New User</h3>
        </div>
      </div>
      <br />
      <br />

      <div className="green-border-box">
        <div
          id="bigpara"
          className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0"
        >
          <div className="mt-16 justify-center sm:flex">
            <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
              <div className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0">
                <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                  <span className="text-gray-200 font-medium">
                    <h3 className="text-green-400 font-semibold">
                      First Name: {newUser.first_name}
                    </h3>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="bigpara"
          className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0"
        >
          <div className="mt-16 justify-center sm:flex">
            <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
              <div className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0">
                <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                  <span className="text-gray-200 font-medium">
                    <h3 className="text-green-400 font-semibold">
                      Last Name: {newUser.last_name}
                    </h3>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="bigpara"
          className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0"
        >
          <div className="mt-16 justify-center sm:flex">
            <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
              <div className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0">
                <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                  <span className="text-gray-200 font-medium">
                    <h3 className="text-green-400 font-semibold">
                      Username: {newUser.username}
                    </h3>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="bigpara"
          className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0"
        >
          <div className="mt-16 justify-center sm:flex">
            <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
              <div className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0">
                <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                  <span className="text-gray-200 font-medium">
                    <h3 className="text-green-400 font-semibold">
                      Email: {newUser.email}
                    </h3>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="bigpara"
          className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0"
        >
          <div className="mt-16 justify-center sm:flex">
            <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
              <div className="max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0">
                <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                  <span className="text-gray-200 font-medium">
                    <h3 className="text-green-400 font-semibold">
                      Password: {newUser.password}
                    </h3>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>New user created with ID {newUser.id}</div>

      <div className="dropdown">
        <button className="dropdownbtn" onClick={handleOpen}>
          Next Steps
        </button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <Link to="/org-intake">
                <button onClick={handleMenuOrgs}>Organization Intake</button>
              </Link>
            </li>
            
              <li className="menu-item">
              <button onClick={handleMenuVol}>Volunteer Intake</button>
            </li>
          </ul>
        ) : null}
        {open ? <div>#</div> : <div>******</div>}
      </div>
    </section>
  );
};

export default UserProfile;








