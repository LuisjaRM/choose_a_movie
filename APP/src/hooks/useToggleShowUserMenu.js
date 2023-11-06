import { useEffect } from "react";

export const useToggleShowUserMenu = ({ setShowUserMenu }) => {
  const toggleShow = () => {
    if (window.scrollY > 1) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleShow);

    return () => {
      window.removeEventListener("scroll", toggleShow);
    };
  });
};
