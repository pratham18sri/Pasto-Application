// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Pastes from './Components/Pastes';
import ViewPastes from './Components/ViewPastes';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const router = createBrowserRouter([
  
  {
  path: '/',
  element: (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <>
          <NavBar />
          <Home />
        </>
      </SignedIn>
    </>
  )
}
,
  {
    path: '/home',
    element: (
      <SignedIn>
        <>
          <NavBar />
          <Home />
        </>
      </SignedIn>
    ),
  },
  {
    path: '/pastes',
    element: (
      <SignedIn>
        <>
          <NavBar />
          <Pastes />
        </>
      </SignedIn>
    ),
  },
  {
    path: '/pastes/:id',
    element: (
      <SignedIn>
        <>
          <NavBar />
          <ViewPastes />
        </>
      </SignedIn>
    ),
  },
  {
    path: '*',
    element: (
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
