// Context
import { useAuth } from "../contexts/AuthContext";
// Components
import { Header } from "../components/Fixed/Header/Header";
import { Auth } from "../components/Modals/Auth/Auth";
// React imports
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Loading } from "../components/Modals/Loading/Loading";

// Page structure
export const Root = () => {
  // Render
  const [render, setRender] = useState(false);

  setTimeout(() => {
    setRender(true);
  }, 500);

  // Href
  const parameters = document.location.href.substring(22);
  const pageHref = parameters.split("/")[0];

  // Imports
  const { token, user } = useAuth();

  return render ? (
    <>
      <Header />

      <main>
        {(token && user) || pageHref === "validate" ? <Outlet /> : <Auth />}
      </main>
    </>
  ) : (
    <Loading />
  );
};
