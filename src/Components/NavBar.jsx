// src/Components/NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <NavLink
          to='/home'
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Home
        </NavLink>
        <NavLink
          to='/pastes'
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Pastes
        </NavLink>
      </div>

      <div className="nav-auth">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default NavBar;
