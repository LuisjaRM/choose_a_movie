import "./CreateRoom.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// React imports
import { useState } from "react";
// Service
import { addRoomService } from "../../../services/roomServices/addRoomService";

export const CreateRoom = ({
  setShowCreateRoom,
  setShowRoomAvatar,
  setRoomID,
}) => {
  // Const
  const title = "Crea tu sala";
  const continueButton = "Continuar";

  // Imports
  const { token } = useAuth();

  // States
  const [roomTitle, setRoomTitle] = useState("");
  const [error, setError] = useState("");

  // HandlesClick
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickExitModal = () => {
    setShowCreateRoom(false);
    setRoomTitle("");
  };

  // HandleChange
  const handleChangeRoomTitle = (e) => {
    setRoomTitle(e.target.value);
  };

  // HandleForm
  const handleFormCreateRoom = async (e) => {
    e.preventDefault();

    try {
      const roomData = await addRoomService(token, { title: roomTitle });
      setRoomID(roomData.data.id);
      setShowCreateRoom(false);
      setShowRoomAvatar(true);
      setRoomTitle("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Errors
  if (error === `"title" length must be at least 4 characters long`)
    setError("El nombre no puede ser inferior a 4 caracteres.");

  if (
    error === `"title" length must be less than or equal to 15 characters long`
  )
    setError("El nombre no puede ser superior a 15 caracteres.");

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
              value={roomTitle}
              onChange={handleChangeRoomTitle}
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
