import "./SendRoomRequest.css";

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
import { useFriendsRooms } from "../../../services/roomServices/useFriendsRooms";
import { useSearchFriendsRooms } from "../../../services/roomServices/useSearchFriendsRooms";
import { requestToRoomService } from "../../../services/friendServices/requestToRoomService";

export const SendRoomRequest = ({ setShowRoomRequest }) => {
  // Const
  const message = "Solicitud enviada.";

  // Imports
  const { token } = useAuth();
  const { data: allRooms } = useFriendsRooms(token);
  const [search, setSearch] = useState("");
  const { getSearch, data: allRoomsSearched } = useSearchFriendsRooms(token, {
    search,
  });

  // States
  const [roomID, setRoomID] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Functions
  const debounceGetRooms = useCallback(
    debounce((search) => {
      getSearch(search);
    }, 300),
    [getSearch]
  );

  const sendRequest = async () => {
    await requestToRoomService(token, { roomID });
    setShowConfirmModal(true);
    setSearch("");

    setTimeout(() => {
      setShowConfirmModal(false);
    }, 2000);
  };
  roomID != "" && sendRequest() && setRoomID("");

  // HandlesClick
  const handleClickExitModal = () => {
    setShowRoomRequest(false);
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

  return (
    <section className="modal-back dark" onClick={handleClickExitModal}>
      <section className="all-rooms" onClick={handleClickModal}>
        <form className="search-form home-form" onSubmit={handleFormSearchRoom}>
          <fieldset id="home-fieldset">
            <input
              placeholder="Nombre de la sala"
              type="text"
              id="search-room"
              name="search-room"
              autoComplete="off"
              autoFocus
              value={search}
              onChange={handleChangeSearch}
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

        <ul
          className={`my-rooms ${
            allRoomsSearched?.length < 3 || allRooms?.length < 3
              ? "few-rooms"
              : ""
          }`}
        >
          {allRoomsSearched && search != ""
            ? allRoomsSearched?.map((room) => (
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
              ))
            : allRooms?.map((room) => (
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
