import "./Room.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Components
import { InviteFriendsToRoom } from "../../components/Modals/InviteFriendsToRoom/InviteFriendsToRoom";
import { AnswerModal } from "../../components/Modals/AnswerModal/AnswerModal";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { EditRoomAvatar } from "../../components/Modals/EditRoomAvatar/EditRoomAvatar";
import { FilmLists } from "../../components/Fixed/FilmLists/FilmLists";
import { Loading } from "../../components/Modals/Loading/Loading";
import { ErrorPage } from "../../components/Modals/ErrorPage/ErrorPage";
// Material icons
import { SvgIcon } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { useSingleRoom } from "../../services/roomServices/useSingleRoom";
import { updateRoomService } from "../../services/roomServices/updateRoomService";
import { removeRoomFriend } from "../../services/roomServices/removeRoomFriend";
import { deleteRoomService } from "../../services/roomServices/deleteRoomService";

export const Room = () => {
  // Const
  const deleteFriendAnswer =
    "¿Estás seguro de que quieres eliminarlo de la sala?";
  const deleteFriendMessage = "Amigo eliminado de la sala.";
  const deleteRoomAnswer = "¿Estás seguro de que quieres borrar la sala?";
  const deleteRoomMessage = "Sala borrada.";
  const titleResponse = "Título modificado.";
  const sendButton = "OK";

  // Href
  const pageHREF = document.location.href.substring(22);
  const pageRoomID = Number(pageHREF.split("/")[1]);

  // Imports
  const { userRooms, userRoomsRefresh, user, token } = useAuth();
  const { data: room, refresh } = useSingleRoom(token, pageRoomID);
  const roomInfo = room.room_info != undefined && room.room_info[0];
  const roomTitle = roomInfo.title;
  const navigate = useNavigate();

  // Document title
  document.title = `${roomTitle}`;

  // Access
  const [access, setAcces] = useState("init");
  useEffect(() => {
    let userRoomsID = [];

    userRooms?.forEach((room) => {
      if (room.id === pageRoomID) {
        userRoomsID.push(room.id);
      }
    });

    userRoomsID.includes(pageRoomID) ? setAcces(true) : setAcces(false);
  }, [userRooms, pageRoomID]);

  // States
  const [friendId, setFriendId] = useState("");
  const [roomID, setRoomID] = useState("");
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showInviteFriendsToRoom, setShowInviteFriendsToRoom] = useState(false);
  const [showEditRoomAvatar, setShowEditRoomAvatar] = useState(false);
  const [showTitleForm, setShowTitleForm] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesClick
  const handleClickEditRoomAvatar = (e) => {
    e.stopPropagation();
    setShowEditRoomAvatar(true);
  };
  const handleClickEditRoomTitle = (e) => {
    e.stopPropagation();
    setRoomID(roomInfo.id);
    setShowTitleForm(!showTitleForm);
  };

  // HandleChange
  const handleChangeEditTitle = (e) => {
    setTitle(e.target.value);
  };

  // HandleForm
  const handleFormEditTitle = async (e) => {
    e.preventDefault();

    try {
      await updateRoomService(token, roomID, { title });
      setMessage(titleResponse);
      setShowConfirmModal(true);
      setError("");
      refresh();
      userRoomsRefresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowTitleForm(false);
        setMessage("");
        setTitle("");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Functions
  const deleteFriendToRoom = async () => {
    await removeRoomFriend(token, friendId, pageRoomID);
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
    await deleteRoomService(token, pageRoomID);
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
    setError("El nombre de la sala no puede ser inferior a 4 caracteres.");

  if (
    error === `"title" length must be less than or equal to 15 characters long`
  )
    setError("El nombre de la sala no puede ser superior a 15 caracteres.");

  if (error === `There is already a room registered under that name`)
    setError("Ya existe una sala registrada con ese nombre.");

  return (
    <>
      {access && (
        <section className="room-page">
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
                  <p className="room-page-title">{roomInfo.title}</p>
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
                        <button type="submit" className="edit-profile-button">
                          {sendButton}
                        </button>
                      </section>
                    </fieldset>
                  </form>
                )}
              </section>

              <section className="room-page-info-buttons">
                {roomInfo.created_by === user.id && (
                  <button
                    type="button"
                    className="icon-button"
                    title="Editar nombre de la sala"
                    onClick={handleClickEditRoomTitle}
                  >
                    <SvgIcon
                      className="icon invite-friend"
                      component={ModeEditIcon}
                      inheritViewBox
                    />
                  </button>
                )}

                <button
                  type="button"
                  className="icon-button"
                  title="Invitar a un amigo a la sala"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRoomID(roomInfo.id);
                    setShowInviteFriendsToRoom(true);
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
                      setRoomID(roomInfo.id);
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
                  onClick={(e) => {
                    e.stopPropagation();
                    friend.username != user.username &&
                      navigate(`/amigos/perfil/${friend.username}`);
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

          <FilmLists roomID={roomInfo.id} roomTitle={roomTitle} />

          {showInviteFriendsToRoom && (
            <InviteFriendsToRoom
              setShowInviteFriendsToRoom={setShowInviteFriendsToRoom}
              roomID={roomID}
              setRoomID={setRoomID}
              refresh={refresh}
            />
          )}

          {showEditRoomAvatar && (
            <EditRoomAvatar
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
      )}

      {access === "init" && <Loading />}
      {!access && <ErrorPage />}
    </>
  );
};
