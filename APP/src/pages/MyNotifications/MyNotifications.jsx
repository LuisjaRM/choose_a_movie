import "./MyNotifications.css";

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
import { patchReadNotification } from "../../services/userServices/patchReadNotification";
import { acceptFriendService } from "../../services/userServices/acceptFriendService";
import { acceptRoomService } from "../../services/roomServices/acceptRoomService";
import { acceptRequestRoomService } from "../../services/roomServices/acceptRequestRoomService";
import { useGetNotifications } from "../../services/useGetServices/useGetDataServices";

export const MyNotifications = () => {
  // Const
  const { user, token } = useAuth();
  const pageHREF = document.location.href.substring(22);
  const pageUsername = pageHREF.split("/")[1];

  const title = "Notificaciones";

  const { data: notifications, refresh } = useGetNotifications(token);
  const navigate = useNavigate();

  const [readNotification, setReadNotification] = useState(false);
  const [notificationId, setnotificationId] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationUsername, setNotificationUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const acceptFriendAnswer = `¿Quieres aceptar a ${notificationUsername} como amigo?`;
  const acceptFriendMessage = `Ahora eres amigo de ${notificationUsername}.`;
  const acceptRoomAnswer = `¿Quieres unirte a la sala ${roomName}?`;
  const acceptRoomMessage = `Te has unido a la sala ${roomName}.`;
  const acceptRequestAnswer = `¿Quieres aceptar que ${notificationUsername} se una a la sala ${roomName}?`;
  const acceptRequestMessage = `Solicitud aceptada.`;

  // Functions
  const readNotificationService = async () => {
    try {
      await patchReadNotification(token, notificationId);
      refresh();
    } catch (error) {
      setError(error.message);
    }
  };
  readNotification && readNotificationService() && setReadNotification(false);

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
    setShowAnswerModal(true);
    setNotificationMessage("");
  }

  if (
    notificationMessage.includes("solicitado") &&
    !notificationMessage.includes("aceptado")
  ) {
    setAnswer(acceptRequestAnswer);
    setMessage(acceptRequestMessage);
    setShowAnswerModal(true);
    setNotificationMessage("");
  }

  const acceptFriend = async () => {
    try {
      await acceptFriendService(token, notificationUsername);
      setShowConfirmModal(true);

      setTimeout(() => {
        setShowConfirmModal(false);
        setMessage("");
        refresh();
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
      await acceptRoomService(token, roomName, notificationUsername);
      setShowConfirmModal(true);

      setTimeout(() => {
        setShowConfirmModal(false);
        setMessage("");
        refresh();
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };
  response && answer === acceptRoomAnswer && acceptRoom() && setResponse(false);

  const acceptRequest = async () => {
    try {
      await acceptRequestRoomService(token, roomName, notificationUsername);
      setShowConfirmModal(true);

      setTimeout(() => {
        setShowConfirmModal(false);
        setMessage("");
        refresh();
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
  if (error === `The user does not exist`) setError(`Invitación caducada.`);

  if (error === `They're already friends`)
    setError(`Ya eres amigo de ${notificationUsername}.`);

  if (error === `There is no room`) setError(`No existe la sala.`);

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
                  setRoomName(room?.split(".")[0]);
                  setReadNotification(true);
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
                      navigate(`/user-profile/${notification.username}`);
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
