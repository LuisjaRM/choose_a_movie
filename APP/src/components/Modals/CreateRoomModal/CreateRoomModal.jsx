import "./CreateRoomModal.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// React imports
import { useState } from "react";
// Service
import { createRoomService } from "../../../services/roomServices/createRoomService";

export const CreateRoomModal = ({
  setShowCreateRoom,
  setShowRoomAvatarModal,
  setRoomID,
}) => {
  // Const
  const title = "Crea tu sala";
  const continueButton = "Continuar";

  const { token } = useAuth();

  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  // HandlesClick
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickExitModal = () => {
    setShowCreateRoom(false);
    setRoomName("");
  };

  // HandlesChange
  const handleChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  // HandlesForm
  const handleFormCreateRoom = async (e) => {
    e.preventDefault();

    try {
      const roomData = await createRoomService(token, roomName);
      setRoomID(roomData.data.id);
      setShowCreateRoom(false);
      setShowRoomAvatarModal(true);
      setRoomName("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Errors
  if (error === `"roomName" length must be at least 4 characters long`)
    setError("El nombre del usuario no puede ser inferior a 4 caracteres.");

  if (
    error ===
    `"roomName" length must be less than or equal to 15 characters long`
  )
    setError("El nombre del usuario no puede ser superior a 15 caracteres.");

  if (error === `There is already a room registered under that name`)
    setError("Ya existe una sala registrada con ese nombre.");

  return (
    <section className="modal-back dark" onClick={handleClickExitModal}>
      <section className="modal-body create-room" onClick={handleClickModal}>
        <h2>{title}</h2>

        <form onSubmit={handleFormCreateRoom}>
          <fieldset>
            <input
              placeholder="Nombre de la sala"
              type="text"
              id="room-name"
              name="room-name"
              autoComplete="off"
              value={roomName}
              onChange={handleChangeRoomName}
              autoFocus
              required
            />

            <button
              type="submit"
              title="Crear sala y acceder a avatar"
              className="button create-room-button"
            >
              {continueButton}
            </button>
          </fieldset>

          {error ? <p className="error">⚠️ {error}</p> : null}
        </form>
      </section>
    </section>
  );
};
