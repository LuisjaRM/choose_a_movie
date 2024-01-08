import "./Home.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Components
import { CreateRoom } from "../../components/Modals/CreateRoom/CreateRoom";
import { RoomAvatar } from "../../components/Modals/RoomAvatar/RoomAvatar";
import { InviteFriendsToRoom } from "../../components/Modals/InviteFriendsToRoom/InviteFriendsToRoom";
import { SendRoomRequest } from "../../components/Modals/SendRoomRequest/SendRoomRequest";
// Npm requires
import debounce from "just-debounce-it";
// Material icons
import { SvgIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// React imports
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { useUserRooms } from "../../services/roomServices/useUserRooms";
import { useSearchUserRooms } from "../../services/roomServices/useSearchUserRooms";

export const Home = () => {
  // Const
  const addRoomButton = "Crear sala";
  const joinRoomButton = "Unirse a sala";
  const title = "Mis salas";

  // Imports
  const { token } = useAuth();
  const { data: rooms, refresh } = useUserRooms(token);
  const [search, setSearch] = useState("");
  const { getSearch, data: roomsSearched } = useSearchUserRooms(token, {
    search,
  });
  const navigate = useNavigate();

  // States
  const [roomID, setRoomID] = useState("");

  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showRoomAvatar, setShowRoomAvatar] = useState(false);
  const [showInviteFriendsToRoom, setShowInviteFriendsToRoom] = useState(false);
  const [showRoomRequest, setShowRoomRequest] = useState(false);

  // Functions
  const debounceGetRooms = useCallback(
    debounce((search) => {
      getSearch(search);
    }, 300),
    [getSearch]
  );

  // HandlesClick
  const handleClickAddRoom = () => {
    setShowCreateRoom(true);
  };
  const handleClickJoinRoom = () => {
    setShowRoomRequest(true);
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
    <section className="home-page">
      <section className="home-buttons">
        <button
          type="button"
          className="button home-button"
          onClick={handleClickAddRoom}
        >
          {addRoomButton}
        </button>
        <button
          type="button"
          className="button home-button"
          onClick={handleClickJoinRoom}
        >
          {joinRoomButton}
        </button>
      </section>

      <section className="home-rooms">
        <h2>{title}</h2>

        <form className="search-form home-form" onSubmit={handleFormSearchRoom}>
          <fieldset id="home-fieldset">
            <input
              placeholder="Nombre de la sala"
              type="text"
              id="search-room"
              name="search-room"
              autoComplete="off"
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
            roomsSearched?.length < 3 || rooms?.length < 3 ? "few-rooms" : ""
          }`}
        >
          {roomsSearched && search != ""
            ? roomsSearched?.map((room) => (
                <li
                  key={room.id}
                  title={room.title}
                  onClick={() => {
                    navigate(`/sala/${room.title}`);
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
            : rooms?.map((room) => (
                <li
                  key={room.id}
                  title={room.title}
                  onClick={() => {
                    navigate(`/sala/${room.id}`);
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

      {showCreateRoom && (
        <CreateRoom
          setShowCreateRoom={setShowCreateRoom}
          setShowRoomAvatar={setShowRoomAvatar}
          setRoomID={setRoomID}
        />
      )}

      {showRoomAvatar && (
        <RoomAvatar
          setShowRoomAvatar={setShowRoomAvatar}
          setShowInviteFriendsToRoom={setShowInviteFriendsToRoom}
          roomID={roomID}
          refresh={refresh}
        />
      )}

      {showInviteFriendsToRoom && (
        <InviteFriendsToRoom
          setShowInviteFriendsToRoom={setShowInviteFriendsToRoom}
          roomID={roomID}
          setRoomID={setRoomID}
          refresh={refresh}
        />
      )}

      {showRoomRequest && (
        <SendRoomRequest setShowRoomRequest={setShowRoomRequest} />
      )}
    </section>
  );
};
