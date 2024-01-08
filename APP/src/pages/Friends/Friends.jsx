import "./Friends.css";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
// Components
import { AnswerModal } from "../../components/Modals/AnswerModal/AnswerModal";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { SendFriendInvitation } from "../../components/Modals/SendFriendInvitation/SendFriendInvitation";
import { SendRoomInvitation } from "../../components/Modals/SendRoomInvitation/SendRoomInvitation";
import { ErrorPage } from "../../components/Modals/ErrorPage/ErrorPage";
// Npm requires
import debounce from "just-debounce-it";
// Material icons
import { SvgIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonIcon from "@mui/icons-material/Person";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
// React Imports
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
// Services
import { useUserFriends } from "../../services/friendServices/useUserFriends";
import { useSearchUserFriends } from "../../services/friendServices/useSearchUserFriends";
import { deleteFriendService } from "../../services/friendServices/deleteFriendService";

export const Friends = () => {
  // Imports
  const { user, token } = useAuth();
  const { data: friends, refresh } = useUserFriends(token);
  const [search, setSearch] = useState("");
  const { getSearch, data: friendsSearched } = useSearchUserFriends(token, {
    search,
  });
  const navigate = useNavigate();

  // Href
  const pageHREF = document.location.href.substring(22);
  const pageUsername = pageHREF.split("/")[1];
  // Document Title
  document.title = `Amigos`;

  // Const
  const title = "Amigos";
  const deleteFriendAnswer =
    "¿Estás seguro de que quieres eliminarlo como amigo?";
  const deleteFriendMessage = "Amigo eliminado.";

  // States
  const [friendId, setFriendId] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(false);
  const [message, setMessage] = useState("");

  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSendFriendInvitation, setShowSendFriendInvitation] =
    useState(false);
  const [showSendRoomInvitation, setShowSendRoomInvitation] = useState(false);

  // Functions
  const deleteFriend = async () => {
    await deleteFriendService(token, friendId);
    setMessage(deleteFriendMessage);
    setShowConfirmModal(true);

    setTimeout(() => {
      refresh();
      setShowConfirmModal(false);
      setResponse(false);
      setMessage("");
    }, 3000);
  };
  response && answer === deleteFriendAnswer && deleteFriend();

  const debounceGetFriends = useCallback(
    debounce((search) => {
      getSearch(search);
    }, 300),
    [getSearch]
  );

  // HandleClick
  const handleClickAddFriend = () => {
    setShowSendFriendInvitation(true);
  };

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

  return (
    <>
      {user?.username === pageUsername ? (
        <section className="my-friends-page">
          <section className="title-section">
            <h2 className="title">{title}</h2>

            <button
              type="button"
              title="Añadir amigo"
              className="icon-button add-friend-button"
              onClick={handleClickAddFriend}
            >
              <SvgIcon
                className="icon"
                component={PersonAddAlt1Icon}
                inheritViewBox
              />
            </button>
          </section>

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

          <ul className="my-friends">
            {friendsSearched
              ? friendsSearched?.map((friend) => (
                  <li
                    key={friend.id}
                    onClick={() => {
                      navigate(`/amigos/perfil/${friend.username}`);
                    }}
                    className="friend-card"
                  >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setFriendId(friend.id);
                          setShowSendRoomInvitation(true);
                        }}
                      >
                        <SvgIcon
                          className="icon invite-friend"
                          component={GroupAddIcon}
                          inheritViewBox
                        />
                      </button>

                      <button
                        type="button"
                        className="icon-button"
                        title="Borrar amigo"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFriendId(friend.id);
                          setAnswer(deleteFriendAnswer);
                          setShowAnswerModal(true);
                        }}
                      >
                        <SvgIcon
                          className="icon delete-friend"
                          component={PersonRemoveIcon}
                          inheritViewBox
                        />
                      </button>
                    </section>
                  </li>
                ))
              : friends?.map((friend) => (
                  <li
                    key={friend.id}
                    onClick={() => {
                      navigate(`/amigos/perfil/${friend.username}`);
                    }}
                    className="friend-card"
                  >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setFriendId(friend.id);
                          setShowSendRoomInvitation(true);
                        }}
                      >
                        <SvgIcon
                          className="icon invite-friend"
                          component={GroupAddIcon}
                          inheritViewBox
                        />
                      </button>

                      <button
                        type="button"
                        className="icon-button"
                        title="Borrar amigo"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFriendId(friend.id);
                          setAnswer(deleteFriendAnswer);
                          setShowAnswerModal(true);
                        }}
                      >
                        <SvgIcon
                          className="icon delete-friend"
                          component={PersonRemoveIcon}
                          inheritViewBox
                        />
                      </button>
                    </section>
                  </li>
                ))}
          </ul>

          {showAnswerModal && (
            <AnswerModal
              answer={answer}
              setResponse={setResponse}
              setShowAnswerModal={setShowAnswerModal}
            />
          )}

          {showConfirmModal && <ConfirmModal message={message} />}

          {showSendFriendInvitation && (
            <SendFriendInvitation
              setShowSendFriendInvitation={setShowSendFriendInvitation}
            />
          )}

          {showSendRoomInvitation && (
            <SendRoomInvitation
              friendID={friendId}
              setFriendID={setFriendId}
              setShowSendRoomInvitation={setShowSendRoomInvitation}
            />
          )}
        </section>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
