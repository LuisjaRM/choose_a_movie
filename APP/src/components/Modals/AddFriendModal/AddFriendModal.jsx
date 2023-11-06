import "./AddFriendModal.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Component
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// React imports
import { useState } from "react";
// Service
import { addFriendService } from "../../../services/userServices/addFriendService";

export const AddFriendModal = ({ setShowAddFriendModal, setShowUserMenu }) => {
  // Const
  const title = "Invita a un amigo";
  const message = "Invitación enviada.";
  const sendButton = "Enviar";
  const sendEmail = "Enviar la invitación por correo";
  const returnBack = "Volver";

  const { token } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [showEmail, setShowEmail] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesChange
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  // HandlesClick
  const handleClickExit = () => {
    setShowAddFriendModal(false);
  };
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickSendEmail = (e) => {
    e.preventDefault();
    setShowEmail(!showEmail);
    setUsername("");
    setEmail("");
    setError("");
  };

  // HandlesForm
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await addFriendService(token, { username, email });
      setShowConfirmModal(true);
      setError("");

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowAddFriendModal(false);
        setShowUserMenu(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Errors
  if (error === `There is no user registered with this username`)
    setError("No existe ningún usuario registrado con ese nombre de usuario.");

  if (error === `You cannot send a friend request to yourself`)
    setError("No puedes enviarte una solicitud de amistad a ti mismo.");

  if (error === "You have already sent an invitation")
    setError("Ya has enviado una invitación a este usuario.");

  return (
    <section className="modal-back dark" onClick={handleClickExit}>
      <section className="modal-body small" onClick={handleClickModal}>
        <section className="add-friend-modal">
          <h2 className="title">{title}</h2>

          <form className="form" onSubmit={handleForm}>
            {showEmail ? (
              <fieldset>
                <input
                  placeholder="email@email.com"
                  type="email"
                  id="add-friend-email"
                  name="add-friend-email"
                  autoComplete="off"
                  value={email}
                  onChange={handleChangeEmail}
                  autoFocus
                  required
                />
              </fieldset>
            ) : (
              <fieldset>
                <input
                  placeholder="username"
                  type="text"
                  id="add-friend-username"
                  name="add-friend-username"
                  autoComplete="off"
                  value={username}
                  onChange={handleChangeUsername}
                  autoFocus
                  required
                />
              </fieldset>
            )}

            <button type="submit" className="button">
              {sendButton}
            </button>

            {error && <p className="error">⚠️ {error}</p>}
          </form>

          <button
            type="button"
            className="no-button"
            onClick={handleClickSendEmail}
          >
            {showEmail ? returnBack : sendEmail}
          </button>

          {showConfirmModal && <ConfirmModal message={message} />}
        </section>
      </section>
    </section>
  );
};
