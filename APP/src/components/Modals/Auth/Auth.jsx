import "./Auth.css";

// Components
import { Login } from "./Login";
import { Signup } from "./Signup";
// React imports
import { useState } from "react";

export const Auth = () => {
  // Const
  const loginTitle = "Inciar sesión";
  const signupTitle = "Crear cuenta";
  const returnBack = "Volver";

  // States
  const [loginOrSignup, setLoginOrSignup] = useState(false); // False for Login and true for Signup
  const [showRecoverPassword, setShowRecoverPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  // HandleClick
  const handleClickLoginOrSignup = (e) => {
    e.stopPropagation();
    !showRecoverPassword &&
      !showResetPassword &&
      setLoginOrSignup(!loginOrSignup);

    showRecoverPassword && setShowRecoverPassword(false);

    showResetPassword && setShowResetPassword(false);
  };

  return (
    <section className="modal-back dark">
      <section className="modal-body">
        {loginOrSignup ? (
          <Signup setLoginOrSignup={setLoginOrSignup} />
        ) : (
          <Login
            showRecoverPassword={showRecoverPassword}
            setShowRecoverPassword={setShowRecoverPassword}
            showResetPassword={showResetPassword}
            setShowResetPassword={setShowResetPassword}
          />
        )}

        <button
          type="button"
          className="no-button"
          onClick={handleClickLoginOrSignup}
        >
          {!showRecoverPassword &&
            !showResetPassword &&
            loginOrSignup &&
            loginTitle}

          {!showRecoverPassword &&
            !showResetPassword &&
            !loginOrSignup &&
            signupTitle}

          {(showRecoverPassword || showResetPassword) && returnBack}
        </button>
      </section>
    </section>
  );
};
