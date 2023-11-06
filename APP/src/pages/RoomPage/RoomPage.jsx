import "./RoomPage.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Components
import { FriendsToRoomModal } from "../../components/Modals/FriendsToRoomModal/FriendsToRoomModal";
import { AnswerModal } from "../../components/Modals/AnswerModal/AnswerModal";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { ErrorPage } from "../../components/Modals/ErrorPage/ErrorPage";
// Material icons
import { SvgIcon } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { useGetSingleRoom } from "../../services/useGetServices/useGetDataServices";
import { deleteFriendToRoomService } from "../../services/roomServices/deleteFriendToRoomService";
import { EditRoomAvatarModal } from "../../components/Modals/EditRoomAvatarModal/EditRoomAvatarModal";
import { patchRoomTitleService } from "../../services/roomServices/patchRoomTitleService";
import { RoomLists } from "../../components/Fixed/RoomLists/RoomLists";
import { deleteRoomService } from "../../services/roomServices/deleteRoomService";

export const RoomPage = () => {
  // Const
  const { userRooms, user, token } = useAuth();
  const pageHREF = document.location.href.substring(22);
  const pageRoom = pageHREF.split("/")[1];

  const [access, setAcces] = useState(false);
  useEffect(() => {
    userRooms.forEach((room) => {
      if (room.title === pageRoom) {
        setAcces(true);
      }
    });
  }, [userRooms, pageRoom]);

  const sendButton = "OK";

  const navigate = useNavigate();
  const roomTitle = document.location.href?.substring(27);
  const { data: room, refresh } = useGetSingleRoom({ token, roomTitle });
  const roomInfo = room.room_info != undefined && room.room_info[0];

  const [friendId, setFriendId] = useState("");
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const deleteFriendAnswer =
    "¿Estás seguro de que quieres eliminarlo de la sala?";
  const deleteFriendMessage = "Amigo eliminado de la sala.";
  const deleteRoomAnswer = "¿Estás seguro de que quieres borrar la sala?";
  const deleteRoomMessage = "Sala borrada.";
  const titleResponse = "Título modificado.";

  const [showFriendsToRoomModal, setShowFriendsToRoomModal] = useState(false);
  const [showEditRoomAvatar, setShowEditRoomAvatar] = useState(false);
  const [showTitleForm, setShowTitleForm] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandleClick
  const handleClickEditRoomAvatar = (e) => {
    e.stopPropagation();
    setShowEditRoomAvatar(true);
  };
  const handleClickEditRoomTitle = (e) => {
    e.stopPropagation();
    setShowTitleForm(true);
  };
  const handleClickEditTitle = (e) => {
    e.stopPropagation();
    setShowTitleForm(false);
    setTitle("");
    setError("");
  };

  // HandleChange
  const handleChangeEditTitle = (e) => {
    setTitle(e.target.value);
  };

  // HandlesForm
  const handleFormEditTitle = async (e) => {
    e.preventDefault();

    try {
      await patchRoomTitleService(token, { title, roomID: roomInfo.id });
      setMessage(titleResponse);
      setShowConfirmModal(true);
      setError("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowTitleForm(false);
        setMessage("");
        navigate(`/room/${title}`);
        setTitle("");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClickSendTitle = async () => {
    try {
      await patchRoomTitleService(token, { title, roomID: roomInfo.id });
      setMessage(titleResponse);
      setShowConfirmModal(true);
      setError("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowTitleForm(false);
        setMessage("");
        navigate(`/room/${title}`);
        setTitle("");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Functions
  const deleteFriendToRoom = async () => {
    await deleteFriendToRoomService(token, friendId, roomTitle);
    setMessage(deleteFriendMessage);
    setShowConfirmModal(true);

    setTimeout(() => {
      refresh();
      setShowConfirmModal(false);
      setResponse(false);
      setMessage("");
    }, 3000);
  };
  response && answer === deleteFriendAnswer && deleteFriendToRoom();

  const deleteRoom = async () => {
    await deleteRoomService(token, roomTitle);
    setMessage(deleteRoomMessage);
    setShowConfirmModal(true);

    setTimeout(() => {
      setShowConfirmModal(false);
      setResponse(false);
      setMessage("");
      navigate("/");
    }, 3000);
  };
  response && answer === deleteRoomAnswer && deleteRoom();

  // Errors
  if (error === `"title" length must be at least 4 characters long`)
    setError("El nombre del usuario no puede ser inferior a 4 caracteres.");

  if (
    error === `"title" length must be less than or equal to 15 characters long`
  )
    setError("El nombre del usuario no puede ser superior a 15 caracteres.");

  if (error === `There is already a room registered under that name`)
    setError("Ya existe una sala registrada con ese nombre.");

  return (
    <>
      {access ? (
        <section className="room-page" onClick={handleClickEditTitle}>
          <section className="room-page-info-section">
            <section className="room-page-room-info">
              <section className="room-page-info">
                {roomInfo.avatar ? (
                  <img
                    className="room-page-avatar"
                    src={`${import.meta.env.VITE_BACKEND}uploads/${
                      roomInfo.avatar
                    }`}
                    alt={roomInfo.title}
                    onClick={handleClickEditRoomAvatar}
                  />
                ) : (
                  <section
                    className="room-page-default-wrap"
                    onClick={handleClickEditRoomAvatar}
                  >
                    <SvgIcon
                      className="add-avatar-icon"
                      component={ImageSearchIcon}
                      inheritViewBox
                    />
                  </section>
                )}

                {!showTitleForm ? (
                  <p
                    className="room-page-title"
                    onClick={handleClickEditRoomTitle}
                  >
                    {roomInfo.title}
                  </p>
                ) : (
                  <form
                    className="edit-title-form"
                    onSubmit={handleFormEditTitle}
                  >
                    <fieldset>
                      <input
                        className="edit-profile-input"
                        type="text"
                        name="edit-room-title"
                        id="edit-room-title"
                        autoComplete="off"
                        autoFocus
                        value={title}
                        onChange={handleChangeEditTitle}
                        onClick={(e) => e.stopPropagation()}
                        required
                      />

                      <section className="edit-profile-buttons">
                        <button
                          type="button"
                          className="edit-profile-button"
                          onClick={handleClickSendTitle}
                        >
                          {sendButton}
                        </button>
                      </section>
                    </fieldset>
                  </form>
                )}
              </section>

              <section className="room-page-info-buttons">
                <button
                  type="button"
                  className="icon-button"
                  title="Invitar a un amigo a la sala"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFriendsToRoomModal(true);
                  }}
                >
                  <SvgIcon
                    className="icon invite-friend"
                    component={GroupAddIcon}
                    inheritViewBox
                  />
                </button>

                {roomInfo.created_by === user.id && (
                  <button
                    type="button"
                    className="icon-button"
                    title="Borrar sala"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAnswer(deleteRoomAnswer);
                      setShowAnswerModal(true);
                    }}
                  >
                    <SvgIcon
                      className="icon delete-friend"
                      component={DeleteIcon}
                      inheritViewBox
                    />
                  </button>
                )}
              </section>
            </section>

            {error ? <p className="error">⚠️ {error}</p> : null}

            <ul className="room-page-room-user">
              {room.room_users?.map((friend) => (
                <li
                  key={friend.id}
                  className="room-page-user"
                  onClick={() => {
                    navigate(`/user-profile/${friend.username}`);
                  }}
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

                  {roomInfo.created_by === user.id &&
                    roomInfo.created_by != friend.id && (
                      <button
                        type="button"
                        className="icon-button"
                        title="Eliminar amigo de la sala"
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
                    )}
                </li>
              ))}
            </ul>
          </section>

          <RoomLists roomID={roomInfo.id} roomTitle={roomTitle} />

          {showFriendsToRoomModal && (
            <FriendsToRoomModal
              setShowFriendsToRoomModal={setShowFriendsToRoomModal}
              roomID={roomInfo.id}
            />
          )}

          {showEditRoomAvatar && (
            <EditRoomAvatarModal
              setShowEditRoomAvatar={setShowEditRoomAvatar}
              roomInfo={roomInfo}
              refresh={refresh}
            />
          )}

          {showAnswerModal && (
            <AnswerModal
              answer={answer}
              setAnswer={setAnswer}
              setResponse={setResponse}
              setMessage={setMessage}
              setShowAnswerModal={setShowAnswerModal}
            />
          )}

          {showConfirmModal && <ConfirmModal message={message} />}
        </section>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
