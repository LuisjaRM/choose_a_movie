// Context
import { useAuth } from "../../../contexts/AuthContext";
// Components
import { RecoverPassword } from "./RecoverPassword";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// Material icons
import { SvgIcon } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// React imports
import { useState } from "react";
// Service
import { loginService } from "../../../services/authServices/loginService";

export const Login = ({
  showRecoverPassword,
  setShowRecoverPassword,
  showResetPassword,
  setShowResetPassword,
}) => {
  // Imports
  const { login } = useAuth();

  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [seePassword, setSeePassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Const
  const title = "Iniciar sesión";
  const usernameLabel = "Nombre de usuario";
  const passwordLabel = "Contraseña";
  const sendButton = "Iniciar sesión";
  const forgotPassword = "¿Has olvidado tu contraseña?";
  const message = `Bienvenido/a ${username}.`;

  // HandlesChange
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // HandlesClick
  const handleClickSeePassword = (e) => {
    e.preventDefault();
    setSeePassword(!seePassword);
  };
  const handleClickRecoverPassword = (e) => {
    e.preventDefault();
    setError("");
    setUsername("");
    setPassword("");
    setShowRecoverPassword(true);
  };

  // HandleForm
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const data = await loginService({ username, password });
      setShowConfirmModal(true);

      setTimeout(() => {
        login(data.token);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Errors
  if (error === `There is no user registered with this username`)
    setError("No existe ningún usuario registrado con ese nombre.");

  if (error === `Incorrect password`) setError("Contraseña incorrecta.");

  if (error === `User not verified`)
    setError("Usuario no verificado, comprueba tu correo.");

  return (
    <>
      {!showRecoverPassword ? (
        <section className="auth">
          <h2 className="title">{title}</h2>

          <form className="auth__form" onSubmit={handleForm}>
            <fieldset className="auth__fieldset">
              <label className="auth__label" htmlFor="login-username">
                {usernameLabel}
              </label>
              <input
                className="auth__input"
                placeholder="username"
                type="text"
                name="login-username"
                id="login-username"
                value={username}
                onChange={handleChangeUsername}
                autoFocus
                required
              />
            </fieldset>

            <fieldset className="auth__fieldset">
              <label className="auth__label" htmlFor="login-password">
                {passwordLabel}
              </label>
              <section className="password-wrap">
                <input
                  className="auth__input"
                  placeholder="********"
                  type={seePassword ? "text" : "password"}
                  name="login-password"
                  id="login-password"
                  autoComplete="off"
                  value={password}
                  onChange={handleChangePassword}
                  required
                />

                <button
                  type="button"
                  title="Ver contraseña"
                  className="icon-button"
                  onClick={handleClickSeePassword}
                >
                  <SvgIcon
                    className="icon icon--password"
                    component={VisibilityIcon}
                    inheritViewBox
                  />
                </button>
              </section>
            </fieldset>

            <button type="submit" className="button">
              {sendButton}
            </button>
          </form>

          <button
            type="button"
            className="no-button"
            onClick={handleClickRecoverPassword}
          >
            {forgotPassword}
          </button>

          {error ? <p className="error">⚠️ {error}</p> : null}
        </section>
      ) : (
        <RecoverPassword
          setShowRecoverPassword={setShowRecoverPassword}
          showResetPassword={showResetPassword}
          setShowResetPassword={setShowResetPassword}
        />
      )}

      {showConfirmModal && <ConfirmModal message={message} />}
    </>
  );
};
