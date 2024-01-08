import "./InviteFriendsToRoom.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Component
import { AnswerModal } from "../AnswerModal/AnswerModal";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
// Npm requires
import debounce from "just-debounce-it";
// Material icons
import { SvgIcon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
// React imports
import { useCallback, useState } from "react";
// Service
import { useSearchUserFriends } from "../../../services/friendServices/useSearchUserFriends";
import { requestToRoomService } from "../../../services/friendServices/requestToRoomService";

export const InviteFriendsToRoom = ({
  setShowInviteFriendsToRoom,
  roomID,
  setRoomID,
  refresh,
}) => {
  // Const
  const title = "Añade a tus amigos a la sala";
  const answer = "¿Estás seguro de que quieres enviarle una invitación?";
  const message = "Invitación enviada.";

  // Imports
  const { token, userFriends, userRoomsRefresh } = useAuth();
  const [search, setSearch] = useState("");
  const { getSearch, data: friendsSearched } = useSearchUserFriends(token, {
    search,
  });

  // States
  const [friendID, setFriendID] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesClick
  const handleClickExitModal = () => {
    setShowInviteFriendsToRoom(false);
    setRoomID("");
    setSearch("");
    setError("");
    refresh();
    userRoomsRefresh();
  };
  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  // Functions
  const debounceGetFriends = useCallback(
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
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };
  response && sendInvitation() && setResponse(false);

  // HandleChange
  const handleChangeSearch = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debounceGetFriends(newSearch);
  };

  // HandleForm
  const handleFormSearchFriend = async (e) => {
    e.preventDefault();
    getSearch(search);
  };

  // Errors
  if (error === "Has already joined") setError("Ya se ha unido a la sala");

  return (
    <section className="modal-back dark" onClick={handleClickExitModal}>
      <section className="friends-room" onClick={handleClickModal}>
        <h2 className="title">{title}</h2>

        <button
          className="icon-button close-room-button"
          onClick={handleClickExitModal}
        >
          <SvgIcon className="icon" component={CloseIcon} inheritViewBox />
        </button>

        <form className="search-form" onSubmit={handleFormSearchFriend}>
          <fieldset>
            <input
              placeholder="username"
              type="text"
              id="search-friend-username"
              name="search-friend-username"
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

        <ul className="my-friends">
          {friendsSearched && search != ""
            ? friendsSearched?.map((friend) => (
                <li key={friend.id} className="friend-card">
                  <section className="friend-info">
                    {friend.avatar ? (
                      <img
                        className="friend-avatar"
                        src={`${import.meta.env.VITE_BACKEND}uploads/${
                          friend.avatar
                        }`}
                        alt={friend.username}
                      />
                    ) : (
                      <section className="friend-default-wrap">
                        <SvgIcon
                          className="edit-avatar-icon"
                          component={PersonIcon}
                          inheritViewBox
                        />
                      </section>
                    )}
                    <p className="friend-username">{friend.username}</p>
                  </section>

                  <section className="friend-buttons">
                    <button
                      type="button"
                      className="icon-button"
                      title="Invitar a sala"
                      onClick={() => {
                        setFriendID(friend.id);
                        setShowAnswerModal(true);
                      }}
                    >
                      <SvgIcon
                        className="icon invite-friend"
                        component={GroupAddIcon}
                        inheritViewBox
                      />
                    </button>
                  </section>
                </li>
              ))
            : userFriends?.map((friend) => (
                <li key={friend.id} className="friend-card">
                  <section className="friend-info">
                    {friend.avatar ? (
                      <img
                        className="friend-avatar"
                        src={`${import.meta.env.VITE_BACKEND}uploads/${
                          friend.avatar
                        }`}
                        alt={friend.username}
                      />
                    ) : (
                      <SvgIcon
                        className="edit-avatar-icon"
                        component={PersonIcon}
                        inheritViewBox
                      />
                    )}
                    <p className="friend-username">{friend.username}</p>
                  </section>

                  <section className="friend-buttons">
                    <button
                      type="button"
                      className="icon-button"
                      title="Invitar a sala"
                      onClick={() => {
                        setFriendID(friend.id);
                        setShowAnswerModal(true);
                      }}
                    >
                      <SvgIcon
                        className="icon invite-friend"
                        component={GroupAddIcon}
                        inheritViewBox
                      />
                    </button>
                  </section>
                </li>
              ))}
        </ul>
      </section>

      {showAnswerModal && (
        <AnswerModal
          answer={answer}
          setResponse={setResponse}
          setShowAnswerModal={setShowAnswerModal}
        />
      )}

      {showConfirmModal && <ConfirmModal message={message} />}
    </section>
  );
};
