// Context
import { useAuth } from "../../../contexts/AuthContext";
// Components
import { AnswerModal } from "../AnswerModal/AnswerModal";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// Material icons
import { SvgIcon } from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
// React imports
import { useState } from "react";
// Service
import { patchUserInfoService } from "../../../services/userServices/patchUserInfoService";

export const AvatarFormModal = ({
  showAvatarForm,
  setShowAvatarForm,
  setShowPhoneForm,
  setShowUsernameForm,
  setShowEmailForm,
  refresh,
}) => {
  // Const
  const cancelButton = "Cancelar";
  const sendButton = "OK";
  const answer = "¿Está seguro de que quiere modificar su avatar?";
  const message = "Avatar modificado.";

  const { token } = useAuth();

  const [avatar, setAvatar] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [error, setError] = useState("");

  const [response, setResponse] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesClick
  const handleClickEditAvatar = () => {
    setShowAvatarForm(!showAvatarForm);
    setShowPhoneForm(false);
    setShowUsernameForm(false);
    setShowEmailForm(false);
    setError("");
  };

  // HandlesChange
  const handleChangeEditAvatar = (e) => {
    setAvatar(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  // HandlesForm
  const handleFormEditAvatar = (e) => {
    e.preventDefault();
    setShowAnswerModal(true);
  };

  // Fetchs
  const patchAvatar = async () => {
    try {
      await patchUserInfoService({ avatar }, token);
      setShowConfirmModal(true);
      setError("");
      setAvatar("");

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowAvatarForm(false);
        refresh();
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };

  response && patchAvatar() && setResponse(false);

  return (
    <section className="modal-back dark end">
      <form className="avatar-form" onSubmit={handleFormEditAvatar}>
        <fieldset className="avatar-fieldset">
          <label className="avatar-label">
            <input
              className="avatar-input"
              type="file"
              title="Editar avatar"
              name="edit-profile-image"
              id="edit-profile-image"
              onChange={handleChangeEditAvatar}
            />
            {filePreview ? (
              <img
                className="avatar-preview"
                src={filePreview}
                alt="avatar-preview"
              />
            ) : (
              <SvgIcon
                className="add-avatar-icon"
                component={ImageSearchIcon}
                inheritViewBox
              />
            )}
          </label>
        </fieldset>

        <section className="avatar-buttons">
          <button
            type="button"
            className="avatar-button"
            onClick={handleClickEditAvatar}
          >
            {cancelButton}
          </button>
          <button type="submit" className="avatar-button">
            {sendButton}
          </button>
        </section>
      </form>

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
  );
};
