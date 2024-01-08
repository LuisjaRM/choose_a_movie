// Context
import { useAuth } from "../../../contexts/AuthContext";
// Components
import { AnswerModal } from "../AnswerModal/AnswerModal";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// Material
import { SvgIcon } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { changePasswordService } from "../../../services/userServices/changePasswordService";

export const ChangePassword = ({ setShowChangePassword }) => {
  // Const
  const title = "Cambiar contraseña";
  const actualPasswordLabel = "Contraseña actual";
  const newPasswordLabel = "Nueva contraseña";
  const sendButton = "Cambiar contraseña";
  const returnButton = "Volver";
  const message = "Contraseña modificada.";

  // Imports
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(false);

  const [seeOldPassword, setSeeOldPassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandleChange
  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  // HandleClick
  const handleClickExit = () => {
    setShowChangePassword(false);
    setOldPassword("");
    setNewPassword("");
    setAnswer("");
    setResponse(false);
  };
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickSeeOldPassword = (e) => {
    e.preventDefault();
    setSeeOldPassword(!seeOldPassword);
  };
  const handleClickSeeNewPassword = (e) => {
    e.preventDefault();
    setSeeNewPassword(!seeNewPassword);
  };

  // HandleForm
  const handleFormPatchPassword = async (e) => {
    e.preventDefault();
    setShowAnswerModal(true);
    setAnswer("¿Está seguro de que quiere modificar la contraseña?");
  };

  // Functions
  const setPassword = async () => {
    try {
      await changePasswordService(token, {
        oldPassword,
        newPassword,
      });
      setShowConfirmModal(true);
      setError("");
      setOldPassword("");
      setNewPassword("");

      setTimeout(() => {
        setShowConfirmModal(false);
        setResponse(false);
        logout();
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };

  response && setPassword() && setResponse(false);

  // Errors
  if (error === `The new password is the same as the old one`)
    setError("La nueva contraseña no puede ser igual a la anterior.");

  if (error === `The old password is incorrect`)
    setError("La antigua contraseña es incorrecta.");

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
    <section className="modal-back dark" onClick={handleClickExit}>
      <section className="modal-body" onClick={handleClickModal}>
        <section className="login-modal">
          <h2 className="title">{title}</h2>

          <form className="form" onSubmit={handleFormPatchPassword}>
            <fieldset>
              <label htmlFor="patch-password-oldPassword">
                {actualPasswordLabel}
              </label>
              <section className="password-wrap">
                <input
                  placeholder="********"
                  type={seeOldPassword ? "text" : "password"}
                  name="patch-password-oldPassword"
                  id="patch-password-oldPassword"
                  autoComplete="off"
                  value={oldPassword}
                  onChange={handleChangeOldPassword}
                  required
                />

                <button
                  type="button"
                  className="icon-button"
                  onClick={handleClickSeeOldPassword}
                >
                  <SvgIcon
                    className="icon"
                    component={VisibilityIcon}
                    inheritViewBox
                  />
                </button>
              </section>
            </fieldset>

            <fieldset>
              <label htmlFor="patch-password-newPassword">
                {newPasswordLabel}
              </label>
              <section className="password-wrap">
                <input
                  placeholder="********"
                  type={seeNewPassword ? "text" : "password"}
                  name="patch-password-newPassword"
                  id="patch-password-newPassword"
                  autoComplete="off"
                  value={newPassword}
                  onChange={handleChangeNewPassword}
                  required
                />

                <button
                  type="button"
                  className="icon-button"
                  onClick={handleClickSeeNewPassword}
                >
                  <SvgIcon
                    className="icon"
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
        </section>

        <button type="button" className="no-button" onClick={handleClickExit}>
          {returnButton}
        </button>

        {showAnswerModal && (
          <AnswerModal
            answer={answer}
            setResponse={setResponse}
            setShowAnswerModal={setShowAnswerModal}
          />
        )}

        {showConfirmModal && <ConfirmModal message={message} />}
      </section>
    </section>
  );
};
