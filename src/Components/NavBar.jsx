import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import './NavBar.css';

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="nav-links">
        <NavLink
          to='/home'
          className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/pastes'
          className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`
          }
        >
          Pastes
        </NavLink>
      </div>

      <div className="nav-right">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        
        <div className="nav-auth">
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
