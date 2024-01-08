import "./UserMenu.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Component
import { SendFriendInvitation } from "../SendFriendInvitation/SendFriendInvitation";
// Hooks
import { useToggleShowUserMenu } from "../../../hooks/useToggleShowUserMenu";
// Material icons
import { SvgIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
// React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserMenu = ({ showUserMenu, setShowUserMenu }) => {
  // Const
  const addFriendLink = "Añadir amigo";
  const friendsLink = "Amigos";
  const myProfileLink = "Mi perfil";
  const logoutLink = "Cerrar sesión";

  // Imports
  const { user, logout } = useAuth();
  const username = user?.username;
  const navigate = useNavigate();
  useToggleShowUserMenu({ setShowUserMenu });

  // States
  const [showSendFriendInvitation, setShowSendFriendInvitation] =
    useState(false);

  // HandlesClick
  const handleClickNav = (e) => {
    // Stop propagation for nav links
    e.stopPropagation();
  };
  const handleClickExitMenu = () => {
    setShowUserMenu(false);
  };
  const handleClickGoAddFriend = () => {
    setShowSendFriendInvitation(true);
  };
  const handleClickGoMyFriends = () => {
    navigate(`/amigos/${username}`);
    setShowUserMenu(false);
  };
  const handleClickGoMyProfile = () => {
    navigate(`/perfil/${username}`);
    setShowUserMenu(false);
  };
  const handleClickLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
  };

  return (
    showUserMenu && (
      <section className="modal-back" onClick={handleClickExitMenu}>
        <nav className="user-menu" onClick={handleClickNav}>
          <li className="user-info-li">
            {user?.avatar ? (
              <img
                className="icon--avatar"
                src={`${import.meta.env.VITE_BACKEND}uploads/${user?.avatar}`}
                alt={user?.username}
                onClick={handleClickExitMenu}
              />
            ) : (
              <SvgIcon
                className="icon user-icon open-menu"
                component={PersonIcon}
                inheritViewBox
                onClick={handleClickExitMenu}
              />
            )}

            <p>{username}</p>
          </li>

          <li className="user-menu-link" onClick={handleClickGoAddFriend}>
            <p>{addFriendLink}</p>
          </li>

          <li className="user-menu-link" onClick={handleClickGoMyFriends}>
            <p>{friendsLink}</p>
          </li>

          <li className="user-menu-link" onClick={handleClickGoMyProfile}>
            <p>{myProfileLink}</p>
          </li>

          <li className="user-menu-link" onClick={handleClickLogout}>
            <p>{logoutLink}</p>
            <SvgIcon
              className="icon logout-icon"
              component={LogoutIcon}
              inheritViewBox
            />
          </li>
        </nav>

        {showSendFriendInvitation && (
          <SendFriendInvitation
            setShowUserMenu={setShowUserMenu}
            setShowSendFriendInvitation={setShowSendFriendInvitation}
          />
        )}
      </section>
    )
  );
};
