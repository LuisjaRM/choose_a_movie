import "./MyProfile.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Components
import { AnswerModal } from "../../components/Modals/AnswerModal/AnswerModal";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { SetPasswordModal } from "../../components/Modals/SetPasswordModal/SetPasswordModal";
import { ErrorPage } from "../../components/Modals/ErrorPage/ErrorPage";
// Material icons
import { SvgIcon } from "@mui/material";
import HideImageIcon from "@mui/icons-material/HideImage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { deleteAccountService } from "../../services/userServices/deleteAccountService";
import { useGetUserPrivateInfo } from "../../services/useGetServices/useGetDataServices";

export const MyProfile = () => {
  // Const
  const { user, token, logout } = useAuth();
  const pageHREF = document.location.href.substring(22);
  const pageUsername = pageHREF.split("/")[1];

  const setPasswordButton = "Cambiar contraseña";
  const deleteAccountButton = "Borrar cuenta";
  const deleteAnswer =
    "¿Estás seguro de que quieres borrar tu cuenta? Se perderán todos tus datos.";
  const message = "Cuenta borrada con éxito.";

  const { data: userData } = useGetUserPrivateInfo(token);
  const navigate = useNavigate();

  const username = userData?.username;
  const userCreated_at = new Date(userData.created_at);
  const created_at = userCreated_at.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const created_atLine = `Miembro desde ${created_at}`;

  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(false);

  const [showPatchPassword, setShowPatchPassword] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // HandlesClick
  const handleGoEditInfo = () => {
    navigate(`/edit-profile/${username}`);
  };
  const handleClickPatchPassword = () => {
    setShowPatchPassword(true);
  };
  const handleClickDeleteUser = () => {
    setShowAnswerModal(true);
    setAnswer(deleteAnswer);
  };

  // Fetchs
  const deleteAccount = async () => {
    try {
      await deleteAccountService(token);
      setShowConfirmModal(true);
      setError("");

      setTimeout(() => {
        setShowConfirmModal(false);
        setResponse(false);
        logout();
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };
  response && deleteAccount() && setResponse(false);

  return (
    <>
      {user?.username === pageUsername ? (
        <section className="profile-page">
          <ul className="profile-header">
            <li className="icon-wrap">
              <button
                type="button"
                className="icon-button"
                title="Editar perfil"
                onClick={handleGoEditInfo}
              >
                <SvgIcon
                  className="icon"
                  component={ModeEditIcon}
                  inheritViewBox
                />
              </button>
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

          <section className="my-profile-buttons">
            <button
              type="button"
              className="my-profile-button"
              onClick={handleClickPatchPassword}
            >
              {setPasswordButton}
            </button>
            <button
              type="button"
              className="my-profile-button"
              onClick={handleClickDeleteUser}
            >
              {deleteAccountButton}
            </button>

            {error ? <p className="error">⚠️ {error}</p> : null}
          </section>

          {showPatchPassword && (
            <SetPasswordModal setShowPatchPassword={setShowPatchPassword} />
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
