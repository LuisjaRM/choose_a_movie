import "./AddFilm.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// React imports
import { useState } from "react";
// Service
import { addFilmService } from "../../../services/filmServices/addFilmService";

export const AddFilm = ({
  setShowFilmAvatar,
  roomID,
  setPostId,
  setPostType,
}) => {
  // Const
  const titleLabel = "Título";
  const urlLabel = "Enlace";
  const platformLabel = "platforma";
  const TypeLabel = "Tipo";

  // Import
  const { token } = useAuth();

  // States
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [platform, setplatform] = useState("HBO");
  const [type, setType] = useState("movies");
  const [error, setError] = useState("");

  // HandleForm
  const handleFormAddFilm = async (e) => {
    e.preventDefault();

    try {
      // Fetch
      const data = await addFilmService(token, roomID, {
        url,
        title,
        platform,
        type,
      });
      setPostId(data.data.id);
      setPostType(type);

      setShowFilmAvatar(true);
      setTitle("");
      setUrl("");
      setplatform("HBO");
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
    <form className="add-form" onSubmit={handleFormAddFilm}>
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

      <fieldset>
        <label>{platformLabel}</label>

        <select
          name="post-platform"
          id="post-platform"
          value={platform}
          onChange={(e) => setplatform(e.target.value)}
        >
          <option value="HBO">HBO</option>
          <option value="Netflix">Netflix</option>
          <option value="Disney-Plus">Disney Plus</option>
          <option value="Amazon-Prime">Amazon Prime</option>
          <option value="Filmin">Filmin</option>
          <option value="Apple">Apple</option>
          <option value="Movistar">Movistar</option>
          <option value="Youtube">Youtube</option>
          <option value="Twitch">Twitch</option>
          <option value="Others">Otros</option>
        </select>
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

      {error ? <p className="error">⚠️ {error}</p> : null}

      <button className="add-post-button">Continuar</button>
    </form>
  );
};
