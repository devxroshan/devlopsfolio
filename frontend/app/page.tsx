import React from "react";
import AuthNotRequired from "./wrapper/AuthNotRequired";

const LandingPage = () => {
  return (
    <AuthNotRequired>
      <div>Landing Page</div>
    </AuthNotRequired>
  );
};

export default LandingPage;
