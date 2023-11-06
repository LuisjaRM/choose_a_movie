// Components
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { ResetPassword } from "./ResetPassword";
// React imports
import { useState } from "react";
// Service
import { recoverPasswordService } from "../../../services/userServices/recoverPasswordService";

export const RecoverPassword = ({ setShowRecoverPassword }) => {
  // Const
  const title = "Recuperar contraseña";
  const usernameLabel = "Nombre de usuario";
  const emailLabel = "Correo Electrónico";
  const sendButton = "Enviar";
  const forgotUsername = "¿Has olvidado tu nombre de usuario?";
  const returnLogin = "Volver a Iniciar sesión";
  const message = "Hemos enviado un código de recuperación a tu correo.";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [showEmail, setShowEmail] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showConfirmRecoverModal, setShowConfirmRecoverModal] = useState(false);

  // HandlesChange
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  // HandlesClick
  const handleClickAddEmail = () => {
    setError("");
    setShowEmail(true);
  };

  const handleClickReturnBack = () => {
    setShowRecoverPassword(false);
  };

  // HandlesForm
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
        setShowResetPasswordModal(true);
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
      {!showResetPasswordModal && (
        <section className="login-modal">
          <h2 className="title">{title}</h2>

          <form className="form" onSubmit={handleFormRecoverPassword}>
            {!showEmail ? (
              <fieldset>
                <label htmlFor="recover-password-username">
                  {usernameLabel}
                </label>
                <input
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
              <fieldset>
                <label htmlFor="recover-password-email">{emailLabel}</label>
                <input
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

          {error ? <p className="error">⚠️ {error}</p> : null}

          {!showEmail && (
            <button
              type="button"
              className="no-button"
              onClick={handleClickAddEmail}
            >
              {forgotUsername}
            </button>
          )}

          <button
            type="button"
            className="no-button"
            onClick={handleClickReturnBack}
          >
            {returnLogin}
          </button>
        </section>
      )}

      {showConfirmRecoverModal && <ConfirmModal message={message} />}

      {showResetPasswordModal && (
        <ResetPassword setShowRecoverPassword={setShowRecoverPassword} />
      )}
    </>
  );
};
