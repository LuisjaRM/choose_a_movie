import "./AddFriend.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Component
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { addFriendByEmailService } from "../../services/userServices/addFriendByEmailService";

export const AddFriend = () => {
  // Const
  const message = "Invitación aceptada.";
  const parameters = document.location.href.substring(33);
  const usernameOrEmail = parameters.split("/")[0];
  const regCode = parameters.split("/")[1];

  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    user?.username != usernameOrEmail &&
      user?.email != usernameOrEmail &&
      logout();

    const addFriend = async () => {
      try {
        await addFriendByEmailService(token, regCode);
        setShowConfirmModal(true);

        setTimeout(() => {
          setShowConfirmModal(false);
          navigate("/");
        }, 3000);
      } catch (error) {
        setError(error.message);
      }
    };

    (user?.username === usernameOrEmail && addFriend()) ||
      (user?.email === usernameOrEmail && addFriend());
  }, [
    user,
    usernameOrEmail,
    token,
    regCode,
    logout,
    setShowConfirmModal,
    navigate,
  ]);

  // Errors
  if (error === "Expired invitation") setError("Invitación caducada.");

  return (
    <section className="add-friend-page">
      {showConfirmModal && <ConfirmModal message={error ? error : message} />}
    </section>
  );
};
