import React, { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const UserProfile = ({userId, newUser, setNewUser }) => {
  useEffect(() => {
    if (!newUser) {
      fetch(`/api/users/${newUser.id}`)
        .then(response => response.json())
        .then(data => setNewUser(data));
    }
  }, [userId,newUser, setNewUser]);

  return (
    <section className='relative py-14 bg-gray-900'>
      <div className='absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]' style={{ background: "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)" }}></div>
      <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
        <div className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
          <h3 className="text-cyan-400 font-semibold">
            Hello New User
          </h3>
        </div>
      </div>
       <br />
       <br />

       <div className='green-border-box'>     
      <div id='bigpara' className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
        <div className='mt-16 justify-center sm:flex'>
          <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
            <div className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
              <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                <span className='text-gray-200 font-medium'>
                  <h3 className="text-green-400 font-semibold">First Name: {newUser.first_name}</h3>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div id='bigpara' className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
        <div className='mt-16 justify-center sm:flex'>
          <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
            <div className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
              <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                <span className='text-gray-200 font-medium'>
                  <h3 className="text-green-400 font-semibold">Last Name: {newUser.last_name}</h3>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id='bigpara' className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
        <div className='mt-16 justify-center sm:flex'>
          <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
            <div className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
              <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                <span className='text-gray-200 font-medium'>
                  <h3 className="text-green-400 font-semibold">Username: {newUser.username}</h3>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id='bigpara' className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
        <div className='mt-16 justify-center sm:flex'>
          <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
            <div className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
              <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                <span className='text-gray-200 font-medium'>
                  <h3 className="text-green-400 font-semibold">Email: {newUser.email}</h3>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id='bigpara' className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
        <div className='mt-16 justify-center sm:flex'>
          <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
            <div className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
              <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
                <span className='text-gray-200 font-medium'>
                  <h3 className="text-green-400 font-semibold">Password: {newUser.password}</h3>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    

      
 
    <ListGroup>
      <ListGroup.Item>hello1</ListGroup.Item>
      <ListGroup.Item>hello2</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
  
 














      <div>New user created with ID {newUser.id}</div>
    </section>
  );
};

export default UserProfile;
