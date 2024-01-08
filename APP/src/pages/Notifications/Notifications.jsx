import "./Notifications.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Components
import { AnswerModal } from "../../components/Modals/AnswerModal/AnswerModal";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { ErrorPage } from "../../components/Modals/ErrorPage/ErrorPage";
// Material icons
import { SvgIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
// React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { useUserNotifications } from "../../services/notificationServices/useUserNotifications";
import { updateReadNotification } from "../../services/notificationServices/updateReadNotification";
import { updateFriendService } from "../../services/friendServices/updateFriendService";
import { updateRoomUsers } from "../../services/roomServices/updateRoomUsers";

export const Notifications = () => {
  // Imports
  const { user, token, userFriendsRefresh, userRoomsRefresh } = useAuth();
  const { data: notifications, refresh } = useUserNotifications(token);
  const navigate = useNavigate();

  // Href
  const pageHREF = document.location.href.substring(22);
  const pageUsername = pageHREF.split("/")[1];
  // Document Title
  document.title = "Notificaciones";

  // States
  const [isReaded, setIsReaded] = useState(false);
  const [notificationId, setnotificationId] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationUsername, setNotificationUsername] = useState("");
  const [roomTitle, setRoomTitle] = useState("");
  const [hostOrGuest, setHostOrGuest] = useState("");

  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Const
  const title = "Notificaciones";
  const acceptFriendAnswer = `¿Quieres aceptar a ${notificationUsername} como amigo?`;
  const acceptFriendMessage = `Ahora eres amigo de ${notificationUsername}.`;
  const acceptRoomAnswer = `¿Quieres unirte a la sala ${roomTitle}?`;
  const acceptRoomMessage = `Te has unido a la sala ${roomTitle}.`;
  const acceptRequestAnswer = `¿Quieres aceptar que ${notificationUsername} se una a la sala ${roomTitle}?`;
  const acceptRequestMessage = `Solicitud aceptada.`;

  // Functions
  if (
    notificationMessage.includes("amigo") &&
    !notificationMessage.includes("aceptado")
  ) {
    setAnswer(acceptFriendAnswer);
    setMessage(acceptFriendMessage);
    setShowAnswerModal(true);
    setNotificationMessage("");
  }

  if (
    notificationMessage.includes("sala") &&
    !notificationMessage.includes("aceptado")
  ) {
    setAnswer(acceptRoomAnswer);
    setMessage(acceptRoomMessage);
    setHostOrGuest("host");
    setShowAnswerModal(true);
    setNotificationMessage("");
  }

  if (
    notificationMessage.includes("solicitado") &&
    !notificationMessage.includes("aceptado")
  ) {
    setAnswer(acceptRequestAnswer);
    setMessage(acceptRequestMessage);
    setHostOrGuest("guest");
    setShowAnswerModal(true);
    setNotificationMessage("");
  }

  const readNotificationService = async () => {
    try {
      await updateReadNotification(token, notificationId);
      refresh();
    } catch (error) {
      setError(error.message);
    }
  };
  isReaded && readNotificationService() && setIsReaded(false);

  const acceptFriend = async () => {
    try {
      await updateFriendService(token, { username: notificationUsername });
      setShowConfirmModal(true);

      setTimeout(() => {
        setShowConfirmModal(false);
        setMessage("");
        refresh();
        userFriendsRefresh();
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };
  response &&
    answer === acceptFriendAnswer &&
    acceptFriend() &&
    setResponse(false);

  const acceptRoom = async () => {
    try {
      await updateRoomUsers(token, roomTitle, {
        username: notificationUsername,
        hostOrGuest,
      });
      setShowConfirmModal(true);

      setTimeout(() => {
        setShowConfirmModal(false);
        setMessage("");
        setHostOrGuest("");
        refresh();
        userRoomsRefresh();
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };
  response && answer === acceptRoomAnswer && acceptRoom() && setResponse(false);

  const acceptRequest = async () => {
    try {
      await updateRoomUsers(token, roomTitle, {
        username: notificationUsername,
        hostOrGuest,
      });
      setShowConfirmModal(true);

      setTimeout(() => {
        setShowConfirmModal(false);
        setMessage("");
        setHostOrGuest("");
        refresh();
        userRoomsRefresh();
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };
  response &&
    answer === acceptRequestAnswer &&
    acceptRequest() &&
    setResponse(false);

  // Errors
  if (error === `The user does not exist` || error === `Expired invitation`)
    setError(`Invitación caducada.`);

  if (error === `They're already friends`)
    setError(`Ya eres amigo de ${notificationUsername}.`);

  if (error === `The room does not exist`) setError(`Esta sala ya no existe.`);

  if (error === `The relationship between user and room already exists`)
    setError(`Ya has aceptado esta invitación.`);

  if (error === `He has already joined the room`)
    setError(`Ya se ha unido a la sala.`);

  return (
    <>
      {user?.username === pageUsername ? (
        <section className="my-notifications-page">
          <h2 className="title">{title}</h2>

          {error ? <p className="error">⚠️ {error}</p> : null}

          <ul className="my-notifications">
            {notifications?.map((notification) => (
              <li
                key={notification.id}
                onClick={() => {
                  setError("");
                  setnotificationId(notification.id);
                  setNotificationUsername(notification.username);
                  setNotificationMessage(notification.message);
                  const room =
                    notification.message.split(" ")[
                      notification.message.split(" ").length - 1
                    ];
                  setRoomTitle(room?.split(".")[0]);
                  setIsReaded(true);
                }}
                className={`notification-wrap ${
                  notification.readed === 1 && "readed"
                }`}
              >
                <section className="username-wrap">
                  {notification.avatar ? (
                    <img
                      className="notification-avatar"
                      src={`${import.meta.env.VITE_BACKEND}uploads/${
                        notification.avatar
                      }`}
                      alt={notification.username}
                    />
                  ) : (
                    <SvgIcon
                      className="icon"
                      component={PersonIcon}
                      inheritViewBox
                    />
                  )}

                  <p
                    className="notification-username"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/amigos/perfil/${notification.username}`);
                    }}
                  >
                    {notification.username}
                  </p>
                </section>

                <p className="notification-message">{notification.message}</p>

                <p className="notification-date">
                  {new Date(notification.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                {showAnswerModal && (
                  <AnswerModal
                    answer={answer}
                    setResponse={setResponse}
                    setShowAnswerModal={setShowAnswerModal}
                    setAnswer={setAnswer}
                    setMessage={setMessage}
                  />
                )}

                {showConfirmModal && <ConfirmModal message={message} />}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
