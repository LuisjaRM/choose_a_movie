import "./InviteToRoomModal.css";

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
import { sendInvitationService } from "../../../services/userServices/sendInvitationService";
import { useSearchMyRoomService } from "../../../services/useGetServices/useGetSearchServices";

export const InviteToRoomModal = ({
  friendID,
  setFriendID,
  setShowInviteToRoomModal,
}) => {
  // Const
  const title = "¿A qué sala quieres invitarle?";
  const message = "Invitación enviada.";

  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const { getSearch, data: roomsSearched } = useSearchMyRoomService({
    token,
    search,
  });

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
      await sendInvitationService(token, { roomID, friendID });
      setShowConfirmModal(true);
      setSearch("");
      setError("");

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowInviteToRoomModal(false);
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  roomID != "" && sendInvitation() && setRoomID("");

  // HandlesClick
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickExitModal = () => {
    setShowInviteToRoomModal(false);
    setFriendID("");
    setRoomID("");
    setSearch("");
    setError("");
  };

  // HandlesChange
  const handleChangeSearch = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debounceGetRooms(newSearch);
  };

  // HandlesForm
  const handleFormSearchRoom = async (e) => {
    e.preventDefault();
    getSearch(search);
  };

  return (
    <section className="modal-back dark" onClick={handleClickExitModal}>
      <section className="friends-room" onClick={handleClickModal}>
        <h2 className="title">{title}</h2>

        <form className="search-form" onSubmit={handleFormSearchRoom}>
          <fieldset>
            <input
              placeholder="username"
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
