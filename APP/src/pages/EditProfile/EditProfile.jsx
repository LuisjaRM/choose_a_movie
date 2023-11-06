import "./EditProfile.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Components
import { AnswerModal } from "../../components/Modals/AnswerModal/AnswerModal";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { AvatarFormModal } from "../../components/Modals/AvatarFormModal/AvatarFormModal";
import { ErrorPage } from "../../components/Modals/ErrorPage/ErrorPage";
// Material icons
import { SvgIcon } from "@mui/material";
import HideImageIcon from "@mui/icons-material/HideImage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { patchUserInfoService } from "../../services/userServices/patchUserInfoService";
import { useGetUserPrivateInfo } from "../../services/useGetServices/useGetDataServices";

export const EditProfile = () => {
  // Const
  const { user, token, logout } = useAuth();
  const pageHREF = document.location.href.substring(22);
  const pageUsername = pageHREF.split("/")[1];

  const basicInfoTitle = "Información básica";
  const contactInfoTitle = "Información de contacto";
  const avatarTitle = "Avatar";
  const usernameTitle = "Username";
  const emailTitle = "Email";
  const phoneTitle = "Teléfono";
  const cancelButton = "Cancelar";
  const sendButton = "OK";
  const usernameAnswer =
    "¿Estás seguro de que quieres modificar tu nombre de usuario?";
  const emailAnswer =
    "¿Estás seguro de que quieres modificar tu correo electrónico?";
  const phoneAnswer =
    "¿Estás seguro de que quieres modificar tu número de teléfono?";
  const usernameResponse = "Nombre de usuario modificado.";
  const emailResponse =
    "Correo electrónico modificado. Te hemos enviado un correo de verificación a tu nuevo email.";
  const phoneResponse = "Número de teléfono modificado.";

  const { data: userData, refresh } = useGetUserPrivateInfo(token);
  const navigate = useNavigate();

  const [showAvatarForm, setShowAvatarForm] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);

  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [phone, setPhone] = useState(userData?.phone);
  const [error, setError] = useState("");

  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  const [message, setMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesChange
  const handleChangeEditUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEditEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeEditPhone = (e) => {
    setPhone(e.target.value);
  };

  // HandlesClick
  const handleClickEditAvatar = () => {
    setShowAvatarForm(!showAvatarForm);
    setShowPhoneForm(false);
    setShowUsernameForm(false);
    setShowEmailForm(false);
    setError("");
  };
  const handleClickEditUsername = () => {
    setShowUsernameForm(!showUsernameForm);
    setShowAvatarForm(false);
    setShowEmailForm(false);
    setShowPhoneForm(false);
    setError("");
    setUsername("");
  };
  const handleClickEditEmail = () => {
    setShowEmailForm(!showEmailForm);
    setShowAvatarForm(false);
    setShowUsernameForm(false);
    setShowPhoneForm(false);
    setError("");
    setEmail("");
  };
  const handleClickEditPhone = () => {
    setShowPhoneForm(!showPhoneForm);
    setShowAvatarForm(false);
    setShowUsernameForm(false);
    setShowEmailForm(false);
    setError("");
    setPhone("");
  };

  // HandlesForm
  const handleFormEditUsername = (e) => {
    e.preventDefault();
    setShowAnswerModal(true);
    setAnswer(usernameAnswer);
  };
  const handleFormEditEmail = (e) => {
    e.preventDefault();
    setShowAnswerModal(true);
    setAnswer(emailAnswer);
  };
  const handleFormEditPhone = (e) => {
    e.preventDefault();
    setShowAnswerModal(true);
    setAnswer(phoneAnswer);
  };

  // Fetchs

  const patchUsername = async () => {
    try {
      await patchUserInfoService({ username }, token);
      setMessage(usernameResponse);
      setShowConfirmModal(true);
      setError("");
      setUsername("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowUsernameForm(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };

  const patchEmail = async () => {
    try {
      await patchUserInfoService({ email }, token);
      setMessage(emailResponse);
      setShowConfirmModal(true);
      setError("");
      setEmail("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setMessage("");
        logout();
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };

  const patchPhone = async () => {
    try {
      await patchUserInfoService({ phone }, token);
      setMessage(phoneResponse);
      setShowConfirmModal(true);
      setError("");
      setPhone("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowPhoneForm(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };

  response &&
    answer === usernameAnswer &&
    patchUsername() &&
    setResponse(false);

  response && answer === emailAnswer && patchEmail() && setResponse(false);

  response && answer === phoneAnswer && patchPhone() && setResponse(false);

  // Errors
  if (error === `"username" length must be at least 4 characters long`)
    setError("El nombre de usuario no puede ser inferior a 4 caracteres.");

  if (
    error ===
    `"username" length must be less than or equal to 15 characters long`
  )
    setError("El nombre de usuario no puede ser superior a 15 caracteres.");

  if (error === `"username" should not contain white spaces`)
    setError("El nombre de usuario no puede ser contener espacios en blanco.");

  if (
    error ===
    `"phone" with value "${phone}" fails to match the required pattern: /^[0-9]{9}$/`
  )
    setError("Debe introducir un número de teléfono válido.");

  if (error === `You are already registered with this username`)
    setError("Ya está registrado con ese nombre de usuario.");

  if (error === `There is already a registered user with this username`)
    setError("Ya hay un usuario registrado con ese nombre de usuario.");

  if (error === `You are already registered with this email`)
    setError("Ya estás registrado con ese correo electrónico.");

  if (error === `There is already a registered user with this email address`)
    setError("Ya existe un usuario registrado con ese correo electrónico.");

  if (error === `You are already registered with this phone`)
    setError("Ya estás registrado con este teléfono.");

  return (
    <>
      {user?.username === pageUsername ? (
        <section className="edit-profile-page">
          <section className="edit-profile-section">
            <h2>{basicInfoTitle}</h2>

            <ul>
              <li>
                <p className="edit-profile-field-title">{avatarTitle}</p>

                <section className="edit-field">
                  {userData.avatar ? (
                    <img
                      className="edit-profile-avatar"
                      src={`${import.meta.env.VITE_BACKEND}uploads/${
                        userData.avatar
                      }`}
                      alt={userData.username}
                    />
                  ) : (
                    <section className="edit-avatar-default-wrap">
                      <SvgIcon
                        className="edit-avatar-icon"
                        component={HideImageIcon}
                        inheritViewBox
                      />
                    </section>
                  )}

                  <button
                    type="button"
                    title="Editar avatar"
                    className="icon-button"
                    onClick={handleClickEditAvatar}
                  >
                    <SvgIcon
                      className="edit-profile-icon"
                      component={ModeEditIcon}
                      inheritViewBox
                    />
                  </button>
                </section>

                {showAvatarForm && (
                  <AvatarFormModal
                    showAvatarForm={showAvatarForm}
                    setShowAvatarForm={setShowAvatarForm}
                    setShowPhoneForm={setShowPhoneForm}
                    setShowUsernameForm={setShowUsernameForm}
                    setShowEmailForm={setShowEmailForm}
                    refresh={refresh}
                  />
                )}
              </li>

              <li>
                {!showUsernameForm ? (
                  <>
                    <p className="edit-profile-field-title">{usernameTitle}</p>

                    <section className="edit-field">
                      <p>{userData.username}</p>

                      <button
                        type="button"
                        title="Editar nombre de usuario"
                        className="icon-button"
                        onClick={handleClickEditUsername}
                      >
                        <SvgIcon
                          className="edit-profile-icon"
                          component={ModeEditIcon}
                          inheritViewBox
                        />
                      </button>
                    </section>
                  </>
                ) : (
                  <>
                    <form onSubmit={handleFormEditUsername}>
                      <fieldset>
                        <input
                          className="edit-profile-input"
                          type="text"
                          name="edit-profile-username"
                          id="edit-profile-username"
                          autoFocus
                          value={username}
                          onChange={handleChangeEditUsername}
                        />
                      </fieldset>

                      <section className="edit-profile-buttons">
                        <button
                          type="button"
                          className="edit-profile-button"
                          onClick={handleClickEditUsername}
                        >
                          {cancelButton}
                        </button>
                        <button type="submit" className="edit-profile-button">
                          {sendButton}
                        </button>
                      </section>
                    </form>
                  </>
                )}
              </li>
            </ul>
          </section>

          <section className="edit-profile-section">
            <h2>{contactInfoTitle}</h2>

            <ul>
              <li>
                {!showEmailForm ? (
                  <>
                    <p className="edit-profile-field-title">{emailTitle}</p>

                    <section className="edit-field">
                      <p>{userData.email}</p>

                      <button
                        type="button"
                        title="Editar correo electrónico"
                        className="icon-button"
                        onClick={handleClickEditEmail}
                      >
                        <SvgIcon
                          className="edit-profile-icon"
                          component={ModeEditIcon}
                          inheritViewBox
                        />
                      </button>
                    </section>
                  </>
                ) : (
                  <>
                    <form onSubmit={handleFormEditEmail}>
                      <fieldset>
                        <input
                          className="edit-profile-input"
                          type="text"
                          name="edit-profile-username"
                          id="edit-profile-username"
                          autoFocus
                          value={email}
                          onChange={handleChangeEditEmail}
                        />
                      </fieldset>

                      <section className="edit-profile-buttons">
                        <button
                          type="button"
                          className="edit-profile-button"
                          onClick={handleClickEditEmail}
                        >
                          {cancelButton}
                        </button>
                        <button type="submit" className="edit-profile-button">
                          {sendButton}
                        </button>
                      </section>
                    </form>
                  </>
                )}
              </li>

              <li>
                {!showPhoneForm ? (
                  <>
                    <p className="edit-profile-field-title">{phoneTitle}</p>

                    <section className="edit-field">
                      {userData.phone && <p>{userData.phone}</p>}

                      <button
                        type="button"
                        title="Editar número de teléfono"
                        className="icon-button"
                        onClick={handleClickEditPhone}
                      >
                        <SvgIcon
                          className="edit-profile-icon"
                          component={ModeEditIcon}
                          inheritViewBox
                        />
                      </button>
                    </section>
                  </>
                ) : (
                  <>
                    <form onSubmit={handleFormEditPhone}>
                      <fieldset>
                        <input
                          className="edit-profile-input"
                          type="text"
                          name="edit-profile-username"
                          id="edit-profile-username"
                          autoFocus
                          value={phone}
                          onChange={handleChangeEditPhone}
                        />
                      </fieldset>

                      <section className="edit-profile-buttons">
                        <button
                          type="button"
                          className="edit-profile-button"
                          onClick={handleClickEditPhone}
                        >
                          {cancelButton}
                        </button>
                        <button type="submit" className="edit-profile-button">
                          {sendButton}
                        </button>
                      </section>
                    </form>
                  </>
                )}
              </li>
            </ul>
          </section>

          {error ? <p className="error">⚠️ {error}</p> : null}

          {showAnswerModal && (
            <AnswerModal
              answer={answer}
              setResponse={setResponse}
              setShowAnswerModal={setShowAnswerModal}
            />
          )}

          {showConfirmModal && <ConfirmModal message={message} />}
        </section>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
