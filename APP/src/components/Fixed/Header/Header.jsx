import "./Header.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Component
import { UserMenu } from "../../Modals/UserMenu/UserMenu";
// Material icons
import { SvgIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { useUserNotifications } from "../../../services/notificationServices/useUserNotifications";

export const Header = () => {
  // Const
  const title = "ComparteCine";

  // Imports
  const { user, token } = useAuth();
  const { data: notifications, refresh } = useUserNotifications(token);
  const navigate = useNavigate();

  // States
  const [areNotifications, setAreNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Notifications logic
  useEffect(() => {
    setAreNotifications(false);
    notifications.forEach((notification) => {
      notification.readed === 0 && setAreNotifications(true);
    });
  }, [notifications]);

  // HandlesClick
  const handleClickIcons = () => {
    // Refresh for check if exists notifications
    refresh();
  };
  const handleClickGoHome = () => {
    navigate("/");
  };
  const handleClickOpenMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  const handleClickGoMyNotifications = () => {
    navigate(`/notificaciones/${user?.username}`);
  };

  return (
    <header>
      <section className="icons-wrap" onClick={handleClickIcons}>
        <section
          className="icon-button"
          title="Menú"
          onClick={handleClickOpenMenu}
        >
          {user?.avatar ? (
            <img
              className="icon--avatar"
              src={`${import.meta.env.VITE_BACKEND}uploads/${user?.avatar}`}
              alt={user?.username}
            />
          ) : (
            <SvgIcon className="icon" component={PersonIcon} inheritViewBox />
          )}

          <UserMenu
            showUserMenu={showUserMenu}
            setShowUserMenu={setShowUserMenu}
          />
        </section>

        <button
          type="button"
          title="Notificaciones"
          className="icon-button notification-button"
          onClick={handleClickGoMyNotifications}
        >
          <SvgIcon className="icon" component={EmailIcon} inheritViewBox />

          {areNotifications && <p className="notification"></p>}
        </button>

        <button
          type="button"
          title="Inicio"
          className="icon-button"
          onClick={handleClickGoHome}
        >
          <SvgIcon className="icon" component={HomeIcon} inheritViewBox />
        </button>
      </section>

      <h1 className="title" onClick={handleClickGoHome}>
        {title}
      </h1>
    </header>
  );
};
