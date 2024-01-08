// Components
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { ResetPassword } from "./ResetPassword";
// React imports
import { useState } from "react";
// Service
import { recoverPasswordService } from "../../../services/authServices/recoverPasswordService";

export const RecoverPassword = ({
  setShowRecoverPassword,
  showResetPassword,
  setShowResetPassword,
}) => {
  // Const
  const title = "Recuperar contraseña";
  const usernameLabel = "Nombre de usuario";
  const emailLabel = "Correo Electrónico";
  const sendButton = "Enviar";
  const forgotUsername = "¿Has olvidado tu nombre de usuario?";
  const message = "Hemos enviado un código de recuperación a tu correo.";

  // States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [showEmail, setShowEmail] = useState(false);
  const [showConfirmRecoverModal, setShowConfirmRecoverModal] = useState(false);

  // HandlesChange
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  // HandleClick
  const handleClickAddEmail = () => {
    setError("");
    setShowEmail(true);
  };

  // HandleForm
  const handleFormRecoverPassword = async (e) => {
    e.preventDefault();

    try {
      !showEmail && (await recoverPasswordService({ username }));
      showEmail && (await recoverPasswordService({ email }));
      setShowConfirmRecoverModal(true);
      setEmail("");
      setError("");

      setTimeout(() => {
        setShowConfirmRecoverModal(false);
        setShowResetPassword(true);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Errors
  if (error === "The user is not verified yet")
    setError("Usuario no verificado. Comprueba tu correo.");

  if (error === `There is no user registered with this email address`)
    setError("No existe ningún usuario registrado con ese correo electrónico.");

  if (error === `There is no user registered with this username`)
    setError("No existe ningún usuario registrado con ese nombre de usuario.");

  return (
    <>
      {!showResetPassword && (
        <section className="auth">
          <h2 className="title">{title}</h2>

          <form className="auth__form" onSubmit={handleFormRecoverPassword}>
            {!showEmail ? (
              <fieldset className="auth__fieldset">
                <label
                  className="auth__label"
                  htmlFor="recover-password-username"
                >
                  {usernameLabel}
                </label>
                <input
                  className="auth__input"
                  placeholder="username"
                  type="text"
                  name="recover-password-username"
                  id="recover-password-username"
                  value={username}
                  onChange={handleChangeUsername}
                  autoFocus
                  required
                />
              </fieldset>
            ) : (
              <fieldset className="auth__fieldset">
                <label className="auth__label" htmlFor="recover-password-email">
                  {emailLabel}
                </label>
                <input
                  className="auth__input"
                  placeholder="email@email.com"
                  type="email"
                  name="recover-password-email"
                  id="recover-password-email"
                  value={email}
                  onChange={handleChangeEmail}
                  required
                />
              </fieldset>
            )}

            <button
              type="submit"
              title="Enviaremos un código a tu correo"
              className="button"
            >
              {sendButton}
            </button>
          </form>

          {!showEmail && (
            <button
              type="button"
              className="no-button"
              onClick={handleClickAddEmail}
            >
              {forgotUsername}
            </button>
          )}

          {error ? <p className="error">⚠️ {error}</p> : null}
        </section>
      )}

      {showConfirmRecoverModal && <ConfirmModal message={message} />}

      {showResetPassword && (
        <ResetPassword
          setShowRecoverPassword={setShowRecoverPassword}
          setShowResetPassword={setShowResetPassword}
        />
      )}
    </>
  );
};
