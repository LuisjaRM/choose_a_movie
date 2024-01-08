import "./FilmAvatar.css";

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
import { updateFilmService } from "../../../services/filmServices/updateFilmService";

export const FilmAvatar = ({
  setShowAddFilm,
  setShowFilmAvatar,
  type,
  filmID,
  refresh,
}) => {
  // Const
  const cancelButton = "Cancelar";
  const sendButton = "OK";
  const message = "Post creado.";

  // Imports
  const { token } = useAuth();

  // States
  const [photo, setPhoto] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [error, setError] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesClick
  const handleClickExitModal = () => {
    setShowConfirmModal(true);
    setPhoto("");
    refresh();

    setTimeout(() => {
      setShowConfirmModal(false);
      setShowFilmAvatar(false);
      setShowAddFilm(false);
    }, 3000);
  };
  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  const handleChangePostAvatar = (e) => {
    setPhoto(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  // HandlesForm
  const handleFormFilmAvatar = async (e) => {
    e.preventDefault();

    try {
      await updateFilmService(token, type, filmID, { photo });
      setShowConfirmModal(true);
      setPhoto("");
      setError("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowFilmAvatar(false);
        setShowAddFilm(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="modal-back dark" onClick={handleClickExitModal}>
      <section onClick={handleClickModal}>
        <form
          className="avatar-form avatar-film-form"
          onSubmit={handleFormFilmAvatar}
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
              onClick={handleClickExitModal}
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
