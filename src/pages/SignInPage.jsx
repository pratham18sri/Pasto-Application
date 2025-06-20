// src/pages/SignInPage.jsx
import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn path="/sign-in" routing="path" afterSignInUrl="/home" afterSignUpUrl="/home" />
    </div>
  );
};

export default SignInPage;
