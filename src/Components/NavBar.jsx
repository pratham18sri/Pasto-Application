import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import './NavBar.css';

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink
          to='/home'
          className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/pastes'
          className={({ isActive }) => 
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          Pastes
        </NavLink>
      </div>

      <div className="nav-right">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
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
    </nav>
  );
};

export default NavBar;
