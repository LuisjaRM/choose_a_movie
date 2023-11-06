import "./EditRoomAvatarModal.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Component
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// Material icons
import { SvgIcon } from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
// React imports
import { useState } from "react";
// Service
import { patchRoomAvatarService } from "../../../services/roomServices/patchRoomAvatarService";

export const EditRoomAvatarModal = ({
  setShowEditRoomAvatar,
  roomInfo,
  refresh,
}) => {
  // Const
  const cancelButton = "Cancelar";
  const sendButton = "OK";
  const message = "Avatar modificado.";

  const roomID = roomInfo.id;

  const { token } = useAuth();

  const [roomAvatar, setRoomAvatar] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [error, setError] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesClick
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickExitModal = () => {
    setShowEditRoomAvatar(false);
    setRoomAvatar("");
  };
  const handleClickCancelButton = () => {
    setShowEditRoomAvatar(false);
  };

  const handleChangeRoomAvatar = (e) => {
    setRoomAvatar(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  // HandlesForm
  const handleFormRoomAvatar = async (e) => {
    e.preventDefault();

    try {
      await patchRoomAvatarService(token, { roomID, roomAvatar });
      setShowConfirmModal(true);
      setRoomAvatar("");
      setError("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowEditRoomAvatar(false);
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
          onSubmit={handleFormRoomAvatar}
        >
          <fieldset className="avatar-fieldset">
            <label className="avatar-label">
              <input
                className="avatar-input"
                type="file"
                title="Elige un avatar para tu sala"
                name="edit-room-avatar"
                id="edit-room-avatar"
                onChange={handleChangeRoomAvatar}
              />
              {filePreview ? (
                <img
                  className="avatar-preview"
                  src={filePreview}
                  alt="avatar-preview"
                />
              ) : roomInfo.avatar ? (
                <img
                  className="avatar-preview"
                  src={`${import.meta.env.VITE_BACKEND}uploads/${
                    roomInfo.avatar
                  }`}
                  alt={roomInfo.title}
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
