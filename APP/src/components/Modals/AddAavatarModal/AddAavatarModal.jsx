import "./AddAavatarModal.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Components
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// Material icons
import { SvgIcon } from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
// React imports
import { useState } from "react";
// Service
import { patchPostAvatarService } from "../../../services/roomServices/patchPostAvatarService";

export const AddAavatarModal = ({
  setShowAddForm,
  setShowAddAvatarForm,
  postId,
  postType,
  refresh,
}) => {
  // Const
  const cancelButton = "Cancelar";
  const sendButton = "OK";
  const message = "Post creado.";

  const { token } = useAuth();

  const [postAvatar, setPostAvatar] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [error, setError] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesClick
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickExitModal = () => {
    setShowConfirmModal(true);
    setPostAvatar("");
    refresh();

    setTimeout(() => {
      setShowConfirmModal(false);
      setShowAddAvatarForm(false);
      setShowAddForm(false);
    }, 3000);
  };
  const handleClickCancelButton = () => {
    setShowConfirmModal(true);
    setPostAvatar("");
    refresh();

    setTimeout(() => {
      setShowConfirmModal(false);
      setShowAddAvatarForm(false);
      setShowAddForm(false);
    }, 3000);
  };

  const handleChangePostAvatar = (e) => {
    setPostAvatar(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  // HandlesForm
  const handleFormPostAvatar = async (e) => {
    e.preventDefault();

    try {
      await patchPostAvatarService(token, { postId, postType, postAvatar });
      setShowConfirmModal(true);
      setPostAvatar("");
      setError("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowAddAvatarForm(false);
        setShowAddForm(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="modal-back dark" onClick={handleClickExitModal}>
      <section onClick={handleClickModal}>
        <form
          id="room-avatar"
          className="avatar-form"
          onSubmit={handleFormPostAvatar}
        >
          <fieldset className="avatar-fieldset">
            <label className="avatar-label">
              <input
                className="avatar-input"
                type="file"
                title="Elige un avatar para tu sala"
                name="room-avatar"
                id="room-avatar"
                onChange={handleChangePostAvatar}
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
              title="Continuar a invitar a amigos"
              className="avatar-button"
              onClick={handleClickCancelButton}
            >
              {cancelButton}
            </button>
            <button type="submit" className="avatar-button">
              {sendButton}
            </button>
          </section>
        </form>

        {error ? <p className="error">⚠️ {error}</p> : null}
      </section>

      {showConfirmModal && <ConfirmModal message={message} />}
    </section>
  );
};
