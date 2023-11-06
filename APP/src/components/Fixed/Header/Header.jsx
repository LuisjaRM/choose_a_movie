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
import { useGetNotifications } from "../../../services/useGetServices/useGetDataServices";

export const Header = () => {
  // Const
  const title = "ChooseMovie";

  const { user, token } = useAuth();
  const { data: notifications, refresh } = useGetNotifications(token);
  const navigate = useNavigate();

  const [readed, setReaded] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setReaded(true);
    notifications.forEach((notification) => {
      notification.readed === 0 && setReaded(false);
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
    navigate(`/my-notifications/${user?.username}`);
  };

  return (
    <header>
      <section className="header-icons" onClick={handleClickIcons}>
        <section className="icon-button" onClick={handleClickOpenMenu}>
          {user?.avatar ? (
            <img
              className="user-avatar"
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
          className="icon-button notification-icon"
          onClick={handleClickGoMyNotifications}
        >
          <SvgIcon className="icon" component={EmailIcon} inheritViewBox />

          {!readed && <p className="notification"></p>}
        </button>

        <button
          type="button"
          title="Volver a inicio"
          className="icon-button"
          onClick={handleClickGoHome}
        >
          <SvgIcon className="icon" component={HomeIcon} inheritViewBox />
        </button>
      </section>

      <h1 className="header-title" onClick={handleClickGoHome}>
        {title}
      </h1>
    </header>
  );
};
