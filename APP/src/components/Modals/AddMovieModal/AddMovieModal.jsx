import "./AddMovieModal.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// React imports
import { useState } from "react";
// Service
import { postMovieService } from "../../../services/roomServices/postMovieService";

export const AddMovieModal = ({
  setShowAddAvatarForm,
  roomID,
  setPostId,
  setPostType,
}) => {
  // Const
  const titleLabel = "Título";
  const urlLabel = "Enlace";
  const plataformLabel = "Plataforma";
  const TypeLabel = "Tipo";

  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [plataform, setPlataform] = useState("HBO");
  const [type, setType] = useState("movies");
  const [error, setError] = useState("");

  // HandleForm
  const handleFormAddMovie = async (e) => {
    e.preventDefault();

    try {
      // Fetch
      const data = await postMovieService(token, roomID, {
        url,
        title,
        plataform,
        type,
      });
      setPostId(data.data.id);
      setPostType(type);

      setShowAddAvatarForm(true);
      setTitle("");
      setUrl("");
      setPlataform("HBO");
      setType("movies");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Errors
  error === `"url" length must be less than or equal to 280 characters long` &&
    setError(
      "La longitud de la URL debe ser inferior o igual a 280 caracteres"
    );

  error === `"title" length must be less than or equal to 30 characters long` &&
    setError(
      "La longitud del título debe ser inferior o igual a 30 caracteres"
    );

  error === `There is already a post registered under that name` &&
    setError("Ya ha sido registrado un post con ese nombre.");

  return (
    <form className="add-form" onSubmit={handleFormAddMovie}>
      <fieldset>
        <label>{titleLabel}</label>

        <input
          placeholder="Título"
          type="text"
          name="post-title"
          id="post-title"
          autoComplete="off"
          autoFocus
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </fieldset>

      <fieldset>
        <label>{urlLabel}</label>

        <input
          placeholder="https://www.tupagina.com/"
          type="url"
          name="post-url"
          id="post-url"
          autoComplete="off"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </fieldset>

      <fieldset>
        <label>{plataformLabel}</label>

        <select
          name="post-plataform"
          id="post-plataform"
          value={plataform}
          onChange={(e) => setPlataform(e.target.value)}
        >
          <option value="HBO">HBO</option>
          <option value="Netflix">Netflix</option>
          <option value="Disney-Plus">Disney Plus</option>
          <option value="Amazon-Prime">Amazon Prime</option>
          <option value="Youtube">Youtube</option>
          <option value="Others">Otros</option>
        </select>
      </fieldset>

      <fieldset>
        <label>{TypeLabel}</label>

        <select
          name="table"
          id="table"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="movies">Película</option>
          <option value="series">Serie</option>
          <option value="documentaries">Documental</option>
          <option value="videos">Otro</option>
        </select>
      </fieldset>

      {error ? <p className="error">⚠️ {error}</p> : null}

      <button className="add-post-button">Continuar</button>
    </form>
  );
};
