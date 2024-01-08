// Components
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// Material icons
import { SvgIcon } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// React imports
import { useState } from "react";
// Service
import { signupService } from "../../../services/authServices/SignupService";

export const Signup = ({ setLoginOrSignup }) => {
  // Const
  const title = "Crear cuenta";
  const usernameLabel = "Nombre de usuario";
  const emailLabel = "Correo Electrónico";
  const passwordLabel = "Contraseña";
  const repeatPasswordLabel = "Repetir contraseña";
  const sendButton = "Crear cuenta";
  const message =
    "Consulta tu correo para completar el registro, hemos enviado un enlace de verificación.";

  // States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const [seePassword, setSeePassword] = useState(false);
  const [seeRepeatPassword, setSeeRepeatPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesChange
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  // HandlesClick
  const handleClickSeePassword = (e) => {
    e.preventDefault();
    setSeePassword(!seePassword);
  };
  const handleClickSeeRepeatPassword = (e) => {
    e.preventDefault();
    setSeeRepeatPassword(!seeRepeatPassword);
  };

  // HandleForm
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await signupService({ email, password, repeatPassword, username });
      setShowConfirmModal(true);
      setError("");
      setEmail("");
      setPassword("");
      setUsername("");

      setTimeout(() => {
        setShowConfirmModal(false);
        setLoginOrSignup(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Errors
  if (error === `Passwords do not match`)
    setError("Las contrasñas no coinciden.");

  if (error === `Password cannot match username`)
    setError("La contraseña no puede coincidir con el nombre de usuario.");

  if (error === `There is no user registered with this code`)
    setError("Código de recuperación incorrecto.");

  if (
    error === `There is already a registered user with the same email address`
  )
    setError("Ya existe un usuario registrado con ese correo electrónico.");

  if (
    error ===
    `There is already a registered user with the same username address`
  )
    setError("Ya existe un usuario registrado con ese nombre de usuario.");

  if (error === `"username" length must be at least 4 characters long`)
    setError("El nombre de usuario no puede ser inferior a 4 caracteres.");

  if (
    error ===
    `"username" length must be less than or equal to 15 characters long`
  )
    setError("El nombre de usuario no puede ser superior a 15 caracteres.");

  if (error === `"username" should not contain white spaces`)
    setError("El nombre de usuario no puede ser contener espacios en blanco.");

  if (error === `"password" length must be at least 8 characters long`)
    setError("La contraseña no puede ser inferior a 8 caracteres.");

  if (
    error ===
    `"password" length must be less than or equal to 20 characters long`
  )
    setError("La contraseña no puede ser superior a 20 caracteres.");

  if (error === `"password" should not contain white spaces`)
    setError("La contraseña no puede ser contener espacios en blanco.");

  if (error === `"password" should contain at least 1 special character`)
    setError("La contraseña debe contener al menos un carácter especial.");

  if (error === `"password" should contain at least 1 uppercase character`)
    setError("La contraseña debe contener al menos un carácter en mayúscula.");

  if (error === `"password" should contain at least 1 numeric character`)
    setError("La contraseña debe contener al menos un carácter númerico.");

  return (
    <>
      {!showConfirmModal && (
        <section className="auth">
          <h2 className="title">{title}</h2>

          <form className="auth__form" onSubmit={handleForm}>
            <fieldset className="auth__fieldset">
              <label className="auth__label" htmlFor="signup-username">
                {usernameLabel}
              </label>
              <input
                className="auth__input"
                placeholder="username"
                type="text"
                id="signup-username"
                name="signup-username"
                autoComplete="off"
                value={username}
                onChange={handleChangeUsername}
                autoFocus
                required
              />
            </fieldset>

            <fieldset className="auth__fieldset">
              <label className="auth__label" htmlFor="signup-email">
                {emailLabel}
              </label>
              <input
                className="auth__input"
                placeholder="email@email.com"
                type="email"
                id="signup-email"
                name="signup-email"
                autoComplete="off"
                value={email}
                onChange={handleChangeEmail}
                required
              />
            </fieldset>

            <fieldset className="auth__fieldset">
              <label className="auth__label" htmlFor="signup-password">
                {passwordLabel}
              </label>
              <section className="password-wrap">
                <input
                  className="auth__input"
                  placeholder="********"
                  type={seePassword ? "text" : "password"}
                  name="signup-password"
                  id="signup-password"
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

            <fieldset className="auth__fieldset">
              <label className="auth__label" htmlFor="signup-repeat-password">
                {repeatPasswordLabel}
              </label>
              <section className="password-wrap">
                <input
                  className="auth__input"
                  placeholder="********"
                  type={seeRepeatPassword ? "text" : "password"}
                  name="signup-repeat-password"
                  id="signup-repeat-password"
                  autoComplete="off"
                  value={repeatPassword}
                  onChange={handleChangeRepeatPassword}
                  required
                />

                <button
                  type="button"
                  title="Ver contraseña"
                  className="icon-button"
                  onClick={handleClickSeeRepeatPassword}
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

            {error && <p className="error">⚠️ {error}</p>}
          </form>
        </section>
      )}

      {showConfirmModal && <ConfirmModal message={message} />}
    </>
  );
};
