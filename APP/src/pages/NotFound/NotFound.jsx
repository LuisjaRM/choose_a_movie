import "./NotFound.css";

// React imports
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  // Const
  const notFoundTitle = "¡Oh vaya! Parece que algo no funcionó.";
  const notFoundMessage = "La página que buscas no existe.";
  const returnBack = "Ir a inicio";

  const navigate = useNavigate();

  // HandleClick
  const handleClickReturnBack = () => {
    navigate("/");
  };
  return (
    <section className="modal-back">
      <section className="modal-body small">
        <section className="not-found-page">
          <h2>{notFoundTitle}</h2>

          <p>{notFoundMessage}</p>

          <button className="button" onClick={handleClickReturnBack}>
            {returnBack}
          </button>
        </section>
      </section>
    </section>
  );
};
