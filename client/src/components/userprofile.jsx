import React, { useEffect } from 'react';

const UserProfile = ({ newUser, setNewUser }) => {
  useEffect(() => {
    if (!newUser) {
      fetch(`/api/users/${newUser.id}`)
        .then(response => response.json())
        .then(data => setNewUser(data));
    }
  }, [newUser, setNewUser]);

  return (
    <section className='relative py-14 bg-gray-900'>
      <div className='absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]' style={{ background: "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)" }}></div>
      <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
        <div className='max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
          <h3 className="text-cyan-400 font-semibold">
            Pricing
          </h3>
          <p className='text-white text-3xl font-semibold sm:text-4xl'>
            Pay as you grow
          </p>
          <div className='max-w-xl'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
            </p>
          </div>
        </div>
        <div className='mt-16 justify-center sm:flex'>
          <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
            <span className='text-gray-200 font-medium'>
              First Name: {newUser.first_name}
            </span>
          </div>
          <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
            <span className='text-gray-200 font-medium'>
              Last Name: {newUser.last_name}
            </span>
          </div>
          <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
            <span className='text-gray-200 font-medium'>
              Username: {newUser.username}
            </span>
          </div>
          <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
            <span className='text-gray-200 font-medium'>
              Email: {newUser.email}
            </span>
          </div>
          <div className="text-cyan-400 font-semibold bg-gray-900 border-cyan-400 border-x-0 border-transparent p-4 py-8 space-y-4 border-b border-gray-700 md:p-8">
            <span className='text-gray-200 font-medium'>
              Password: {newUser.password}
            </span>
          </div>
          <button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-cyan-500 hover:bg-cyan-600 active-bg-cyan-700'>
            Get Started
          </button>
        </div>
      </div>
      <div>New user created with ID {newUser.id}</div>
    </section>
  );
};

export default UserProfile;
