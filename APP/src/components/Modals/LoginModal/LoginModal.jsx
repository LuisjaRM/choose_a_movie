// Context
import { useAuth } from "../../../contexts/AuthContext";
// Components
import { Login } from "./Login";
import { Signup } from "./Signup";
// React imports
import { useState } from "react";

export const LoginModal = () => {
  // Const
  const loginTitle = "Inciar sesión";
  const signupTitle = "Crear cuenta";

  // React hooks
  const { user } = useAuth();
  const [loginOrSignup, setLoginOrSignup] = useState(false); // False for signup and true for login

  // HandleClick
  const handleClickLoginOrSignup = (e) => {
    e.stopPropagation();
    setLoginOrSignup(!loginOrSignup);
  };

  return (
    !user && (
      <section className="modal-back dark">
        <section className="modal-body">
          {loginOrSignup ? (
            <Signup setLoginOrSignup={setLoginOrSignup} />
          ) : (
            <Login />
          )}

          <button
            type="button"
            className="no-button"
            onClick={handleClickLoginOrSignup}
          >
            {loginOrSignup ? loginTitle : signupTitle}
          </button>
        </section>
      </section>
    )
  );
};
