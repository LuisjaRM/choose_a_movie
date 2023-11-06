import "./Home.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Components
import { CreateRoomModal } from "../../components/Modals/CreateRoomModal/CreateRoomModal";
import { RoomAvatarModal } from "../../components/Modals/RoomAvatarModal/RoomAvatarModal";
import { FriendsToRoomModal } from "../../components/Modals/FriendsToRoomModal/FriendsToRoomModal";
import { JoinRoomModal } from "../../components/Modals/JoinRoomModal/JoinRoomModal";
// Npm requires
import debounce from "just-debounce-it";
// Material icons
import { SvgIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// React imports
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { useGetMyRooms } from "../../services/useGetServices/useGetDataServices";
import { useSearchMyRoomService } from "../../services/useGetServices/useGetSearchServices";

export const Home = () => {
  // Const
  const addRoomButton = "Crear sala";
  const joinRoomButton = "Unirse a sala";
  const title = "Mis salas";

  const [roomID, setRoomID] = useState("");

  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showRoomAvatarModal, setShowRoomAvatarModal] = useState(false);
  const [showFriendsToRoomModal, setShowFriendsToRoomModal] = useState(false);

  const { token } = useAuth();
  const { data: rooms, refresh } = useGetMyRooms(token);
  const [search, setSearch] = useState("");
  const { getSearch, data: roomsSearched } = useSearchMyRoomService({
    token,
    search,
  });
  const navigate = useNavigate();

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
    setShowJoinRoom(true);
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
          {roomsSearched
            ? roomsSearched?.map((room) => (
                <li
                  key={room.id}
                  title={room.title}
                  onClick={() => {
                    navigate(`/room/${room.title}`);
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
                    navigate(`/room/${room.title}`);
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
        <CreateRoomModal
          setShowCreateRoom={setShowCreateRoom}
          setShowRoomAvatarModal={setShowRoomAvatarModal}
          setRoomID={setRoomID}
        />
      )}

      {showRoomAvatarModal && (
        <RoomAvatarModal
          setShowRoomAvatarModal={setShowRoomAvatarModal}
          setShowFriendsToRoomModal={setShowFriendsToRoomModal}
          roomID={roomID}
        />
      )}

      {showFriendsToRoomModal && (
        <FriendsToRoomModal
          setShowFriendsToRoomModal={setShowFriendsToRoomModal}
          roomID={roomID}
          setRoomID={setRoomID}
          refresh={refresh}
        />
      )}

      {showJoinRoom && <JoinRoomModal setShowJoinRoom={setShowJoinRoom} />}
    </section>
  );
};
