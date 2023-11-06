import "./PublicProfile.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Components
import { InviteToRoomModal } from "../../components/Modals/InviteToRoomModal/InviteToRoomModal";
import { AnswerModal } from "../../components/Modals/AnswerModal/AnswerModal";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { ErrorPage } from "../../components/Modals/ErrorPage/ErrorPage";
// Material icons
import { SvgIcon } from "@mui/material";
import HideImageIcon from "@mui/icons-material/HideImage";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MailIcon from "@mui/icons-material/Mail";
// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { useGetUserPublicInfo } from "../../services/useGetServices/useGetDataServices";
import { deleteFriendService } from "../../services/userServices/deleteFriendService";

export const PublicProfile = () => {
  // Const
  const { userFriends, token } = useAuth();
  const pageHREF = document.location.href.substring(22);
  const pageUsername = pageHREF.split("/")[1];

  const [access, setAcces] = useState(false);
  useEffect(() => {
    userFriends.forEach((friend) => {
      if (friend.username === pageUsername) {
        setAcces(true);
      }
    });
  }, [userFriends, pageUsername]);

  const { data: userData } = useGetUserPublicInfo(token, pageUsername);
  const navigate = useNavigate();

  const userCreated_at = new Date(userData.created_at);
  const created_at = userCreated_at.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const created_atLine = `Miembro desde ${created_at}`;

  const deleteFriendAnswer =
    "¿Estás seguro de que quieres eliminarlo como amigo?";
  const deleteFriendMessage = "Amigo eliminado.";

  const [friendId, setFriendId] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(false);
  const [message, setMessage] = useState("");

  const [showInviteToRoomModal, setShowInviteToRoomModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesClick
  const handleClickRoomInvite = (e) => {
    e.stopPropagation();
    setFriendId(userData.id);
    setShowInviteToRoomModal(true);
  };
  const handleClickDeleteFriend = (e) => {
    e.stopPropagation();
    setFriendId(userData.id);
    setAnswer(deleteFriendAnswer);
    setShowAnswerModal(true);
  };

  // Functions
  const deleteFriend = async () => {
    await deleteFriendService(token, friendId);
    setMessage(deleteFriendMessage);
    setShowConfirmModal(true);

    setTimeout(() => {
      setShowConfirmModal(false);
      setResponse(false);
      setMessage("");
      navigate("/");
    }, 3000);
  };
  response && answer === deleteFriendAnswer && deleteFriend();

  return (
    <>
      {access ? (
        <section className="profile-page">
          <ul className="profile-header">
            <li className="icon-wrap">
              <section className="friend-buttons">
                <button
                  type="button"
                  className="icon-button"
                  title="Invitar a sala"
                  onClick={handleClickRoomInvite}
                >
                  <SvgIcon
                    className="icon invite-friend"
                    component={MailIcon}
                    inheritViewBox
                  />
                </button>

                <button
                  type="button"
                  className="icon-button"
                  title="Borrar amigo"
                  onClick={handleClickDeleteFriend}
                >
                  <SvgIcon
                    className="icon delete-friend"
                    component={PersonRemoveIcon}
                    inheritViewBox
                  />
                </button>
              </section>
            </li>

            <li>
              {userData.avatar ? (
                <img
                  className="profile-avatar"
                  src={`${import.meta.env.VITE_BACKEND}uploads/${
                    userData.avatar
                  }`}
                  alt={userData.username}
                />
              ) : (
                <section className="avatar-default-wrap">
                  <SvgIcon
                    className="avatar-icon"
                    component={HideImageIcon}
                    inheritViewBox
                  />
                </section>
              )}
            </li>

            <li>
              <p className="profile-username">{userData.username}</p>
            </li>

            <li>
              <p className="profile-created">{created_atLine}</p>
            </li>
          </ul>

          {showInviteToRoomModal && (
            <InviteToRoomModal
              friendID={friendId}
              setFriendID={setFriendId}
              setShowInviteToRoomModal={setShowInviteToRoomModal}
            />
          )}

          {showAnswerModal && (
            <AnswerModal
              answer={answer}
              setResponse={setResponse}
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
