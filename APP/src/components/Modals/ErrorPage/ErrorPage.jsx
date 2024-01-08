import "./ErrorPage.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Material icons
import { SvgIcon } from "@mui/material";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
// React imports
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  // Const
  const errorTitle = "¡Oh vaya! Parece que algo no funcionó.";
  const errorMessage = "No tienes permiso para acceder a esta página.";
  const returnBack = "Ir a inicio";

  const { logout } = useAuth();
  const navigate = useNavigate();

  // HandleClick
  const handleClickReturnBack = () => {
    navigate("/");
    logout();
  };
  return (
    <section className="modal-back">
      <section className="modal-body">
        <section className="error-page">
          <h2>{errorTitle}</h2>

          <section className="error-section">
            <SvgIcon
              className="error-icon"
              component={DoNotDisturbOnIcon}
              inheritViewBox
            />
          </section>

          <p>{errorMessage}</p>
        </section>
        <button className="button" onClick={handleClickReturnBack}>
          {returnBack}
        </button>
      </section>
    </section>
  );
};
