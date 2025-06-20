import { SignUp } from '@clerk/clerk-react';

const CustomSignUp = () => {
  return (
    <div className="custom-auth-container">
      <h2>Join PasteApp 🚀</h2>
      <p>Create your free account to get started.</p>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

export default CustomSignUp;
