import "./SendRoomInvitation.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Components
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// Npm requires
import debounce from "just-debounce-it";
// Material icons
import { SvgIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// React imports
import { useCallback, useState } from "react";
// Service
import { useSearchUserRooms } from "../../../services/roomServices/useSearchUserRooms";
import { requestToRoomService } from "../../../services/friendServices/requestToRoomService";

export const SendRoomInvitation = ({
  friendID,
  setFriendID,
  setShowSendRoomInvitation,
}) => {
  // Const
  const title = "¿A qué sala quieres invitarle?";
  const message = "Invitación enviada.";

  // Imports
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const { getSearch, data: roomsSearched } = useSearchUserRooms(token, {
    search,
  });

  // States
  const [roomID, setRoomID] = useState("");
  const [error, setError] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Functions
  const debounceGetRooms = useCallback(
    debounce((search) => {
      getSearch(search);
    }, 300),
    [getSearch]
  );

  const sendInvitation = async () => {
    try {
      await requestToRoomService(token, {
        roomID,
        friendID,
      });
      setShowConfirmModal(true);
      setSearch("");
      setError("");

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowSendRoomInvitation(false);
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  roomID != "" && sendInvitation() && setRoomID("");

  // HandleClick
  const handleClickExitModal = () => {
    setShowSendRoomInvitation(false);
    setFriendID("");
    setRoomID("");
    setSearch("");
    setError("");
  };
  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  // HandleChange
  const handleChangeSearch = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debounceGetRooms(newSearch);
  };

  // HandleForm
  const handleFormSearchRoom = async (e) => {
    e.preventDefault();
    getSearch(search);
  };

  // Errors
  if (error === "Has already joined") setError("Ya se ha unido a esta sala.");

  return (
    <section className="modal-back dark" onClick={handleClickExitModal}>
      <section className="friends-room" onClick={handleClickModal}>
        <h2 className="title">{title}</h2>

        <form className="search-form" onSubmit={handleFormSearchRoom}>
          <fieldset>
            <input
              placeholder="Nombre de la sala"
              type="text"
              id="search-add-room"
              name="search-add-room"
              autoComplete="off"
              value={search}
              onChange={handleChangeSearch}
              autoFocus
              required
            />

            <button type="submit" className="search-button">
              <SvgIcon
                className="icon search-icon"
                component={SearchIcon}
                inheritViewBox
              />
            </button>
          </fieldset>
        </form>

        {error ? <p className="error">⚠️ {error}</p> : null}

        <ul
          className={`search-rooms ${roomsSearched?.length < 3 && "few-rooms"}`}
        >
          {roomsSearched?.map((room) => (
            <li
              key={room.id}
              title={room.title}
              onClick={() => {
                setRoomID(room.id);
              }}
              className="room-card"
            >
              <section className="room-info">
                {room.avatar ? (
                  <img
                    className="room-avatar"
                    src={`${import.meta.env.VITE_BACKEND}uploads/${
                      room.avatar
                    }`}
                    alt={room.title}
                  />
                ) : (
                  <section className="room-default-wrap">
                    <p className="room-title">{room.title}</p>
                  </section>
                )}
              </section>
            </li>
          ))}
        </ul>
      </section>

      {showConfirmModal && <ConfirmModal message={message} />}
    </section>
  );
};
