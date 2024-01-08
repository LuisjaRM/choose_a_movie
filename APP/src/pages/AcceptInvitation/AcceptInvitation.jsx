import "./AcceptInvitation.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Component
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { updateFriendService } from "../../services/friendServices/updateFriendService";

export const AcceptInvitation = () => {
  // Const
  const message = "Invitación aceptada.";

  // Href
  const parameters = document.location.href.substring(33);
  const usernameOrEmail = parameters.split("/")[0];
  const regCode = parameters.split("/")[1];

  // Imports
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  // States
  const [error, setError] = useState("");
  const [acceptRequest, setAcceptRequest] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Check if user is loged
  useEffect(() => {
    if (
      user != null &&
      user?.username != usernameOrEmail &&
      user?.email != usernameOrEmail
    ) {
      logout();
    }
  }, [
    user,
    token,
    usernameOrEmail,
    acceptRequest,
    regCode,
    logout,
    setShowConfirmModal,
    navigate,
  ]);

  // Function
  const acceptFriend = async () => {
    try {
      await updateFriendService(token, { regCode });
      setShowConfirmModal(true);

      setTimeout(() => {
        setShowConfirmModal(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  acceptRequest && acceptFriend() && setAcceptRequest(false);

  // Errors
  if (error === "Expired invitation") setError("Invitación caducada.");

  return (
    <section className="add-friend-page">
      {showConfirmModal && <ConfirmModal message={message} />}
    </section>
  );
};
