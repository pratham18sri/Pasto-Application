import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <nav className="navbar">
      <div className="nav-brand">
        {isHomePage ? (
          <span className="logo-text">PasteBin Clone</span>
        ) : (
          <NavLink to="/home" className="logo-link">
            <span className="logo-text">PasteBin Clone</span>
          </NavLink>
        )}
      </div>

      <div className="nav-links">
        <NavLink
          to='/home'
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <svg className="nav-icon" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </NavLink>
        <NavLink
          to='/pastes'
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          <svg className="nav-icon" viewBox="0 0 24 24">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <span>Pastes</span>
        </NavLink>
      </div>

      <div className="nav-auth">
        <SignedIn>
          <div className="user-profile">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="sign-in-button">
              <svg className="sign-in-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <span>Sign In</span>
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default NavBar;
