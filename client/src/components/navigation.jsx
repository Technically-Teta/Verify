import React from 'react';

const Navigation = () => {
  return (
    <nav id='menu' className='navbar'>
      <div className='container'>
        <div className='navbar-header'>
        
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Verify Your Time!</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#features' className='page-scroll'>
               Volunteer Organizations
              </a>
            </li>
        
            <li>
              <a href='#about' className='page-scroll'>
                About
              </a>
            </li>
            <li>
              <a href='#features' className='page-scroll'>
                Profile
              </a>
            </li>
            {/* ... other list items ... */}
            <li>
              <a href='#contact' className='page-scroll'>
                Contact
              </a>
            </li>
            




          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
