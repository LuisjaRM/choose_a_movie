// Context
import { useAuth } from "../contexts/AuthContext";
// Components
import { Header } from "../components/Fixed/Header/Header";
import { LoginModal } from "../components/Modals/LoginModal/LoginModal";
// React imports
import { Outlet } from "react-router-dom";
import { useState } from "react";

// Page structure
export const Root = () => {
  // Render
  const [render, setRender] = useState(false);

  setTimeout(() => {
    setRender(true);
  }, 400);
  const { user } = useAuth();
  const parameters = document.location.href.substring(22);
  const pageHref = parameters.split("/")[0];

  return (
    render && (
      <>
        <Header />

        <main>
          {user || pageHref === "validate" ? <Outlet /> : <LoginModal />}
        </main>
      </>
    )
  );
};
