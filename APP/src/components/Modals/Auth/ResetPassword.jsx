// Component
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// Material icons
import { SvgIcon } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// React imports
import { useState } from "react";
// Service
import { resetPasswordService } from "../../../services/authServices/resetPasswordService";

export const ResetPassword = ({
  setShowRecoverPassword,
  setShowResetPassword,
}) => {
  // Const
  const title = "Recuperar contraseña";
  const RegCodeLabel = "Código de recuperación";
  const passwordLabel = "Contraseña";
  const repeatPasswordLabel = "Repetir contraseña";
  const sendButton = "Recuperar contraseña";
  const message = "Contraseña modificada correctamente.";

  // States
  const [error, setError] = useState("");
  const [recoverCode, setRecoverCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [seePassword, setSeePassword] = useState(false);
  const [seeRepeatPassword, setSeeRepeatPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesChange
  const handleChangeRecoverCode = (e) => {
    setRecoverCode(e.target.value);
  };
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
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
  const handleFormResetPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPasswordService({
        recoverCode,
        newPassword,
        repeatPassword,
      });
      setShowConfirmModal(true);
      setError("");
      setRecoverCode("");
      setNewPassword("");
      setRepeatPassword("");

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowRecoverPassword(false);
        setShowResetPassword(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Errors
  if (error === `Incorrect recovery code`)
    setError("Código de recuperación incorrecto.");

  if (error === `Passwords do not match`)
    setError("Las contrasñas no coinciden.");

  if (error === `Password cannot match username`)
    setError("La contraseña no puede coincidir con el nombre de usuario.");

  if (error === `"newPassword" length must be at least 8 characters long`)
    setError("La contraseña no puede ser inferior a 8 caracteres.");

  if (
    error ===
    `"newPassword" length must be less than or equal to 20 characters long`
  )
    setError("La contraseña no puede ser superior a 20 caracteres.");

  if (error === `"newPassword" should not contain white spaces`)
    setError("La contraseña no puede ser contener espacios en blanco.");

  if (error === `"newPassword" should contain at least 1 special character`)
    setError("La contraseña debe contener al menos un carácter especial.");

  if (error === `"newPassword" should contain at least 1 uppercase character`)
    setError("La contraseña debe contener al menos un carácter en mayúscula.");

  if (error === `"newPassword" should contain at least 1 numeric character`)
    setError("La contraseña debe contener al menos un carácter númerico.");

  return (
    <section className="auth">
      <h2 className="title">{title}</h2>

      <form className="auth__form" onSubmit={handleFormResetPassword}>
        <fieldset className="auth__fieldset">
          <label className="auth__label" htmlFor="reset-password-code">
            {RegCodeLabel}
          </label>
          <input
            className="auth__input"
            type="text"
            name="reset-password-code"
            id="reset-password-code"
            autoComplete="off"
            value={recoverCode}
            onChange={handleChangeRecoverCode}
            autoFocus
            required
          />
        </fieldset>

        <fieldset className="auth__fieldset">
          <label className="auth__label" htmlFor="reset-password-newPassword">
            {passwordLabel}
          </label>
          <section className="password-wrap">
            <input
              className="auth__input"
              placeholder="********"
              type={seePassword ? "text" : "password"}
              name="reset-password-newPassword"
              id="reset-password-newPassword"
              autoComplete="off"
              value={newPassword}
              onChange={handleChangeNewPassword}
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
          <label
            className="auth__label"
            htmlFor="reset-password-newPasswordRepeat"
          >
            {repeatPasswordLabel}
          </label>
          <section className="password-wrap">
            <input
              className="auth__input"
              placeholder="********"
              type={seeRepeatPassword ? "text" : "password"}
              name="reset-password-newPasswordRepeat"
              id="reset-password-newPasswordRepeat"
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
      </form>

      {error ? <p className="error">⚠️ {error}</p> : null}

      {showConfirmModal && <ConfirmModal message={message} />}
    </section>
  );
};
