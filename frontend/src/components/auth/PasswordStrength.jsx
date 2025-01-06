import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrength = ({ password }) => {
  const score = zxcvbn(password).score;
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strength = strengthLabels[score];

  return (
    <div className="password-strength">
      <p>Password Strength: {strength}</p>
    </div>
  );
};

export default PasswordStrength;
