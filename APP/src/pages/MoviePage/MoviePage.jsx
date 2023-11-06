import "./MoviePage.css";

// Context
import { useAuth } from "../../contexts/AuthContext";
// Components
import { AnswerModal } from "../../components/Modals/AnswerModal/AnswerModal";
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
import { ErrorPage } from "../../components/Modals/ErrorPage/ErrorPage";
// Material icons
import { SvgIcon } from "@mui/material";
import HideImageIcon from "@mui/icons-material/HideImage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SendIcon from "@mui/icons-material/Send";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Service
import { useGetSingleMovie } from "../../services/useGetServices/useGetDataServices";
import { patchMovieService } from "../../services/roomServices/patchMovieService";
import { patchPostAvatarService } from "../../services/roomServices/patchPostAvatarService";
import { setIsCheckService } from "../../services/roomServices/setIsCheckService";
import { deleteMovieService } from "../../services/roomServices/deleteMovieService";

export const MoviePage = () => {
  // Const
  const { userRooms, token } = useAuth();
  const pageHREF = document.location.href.substring(22);
  const pageRoom = pageHREF.split("/")[1];

  const [access, setAcces] = useState(false);
  useEffect(() => {
    userRooms.forEach((room) => {
      if (room.title === pageRoom) {
        setAcces(true);
      }
    });
  }, [userRooms, pageRoom]);

  const navigate = useNavigate();
  const roomTitle = document.location.href.substring(27).split("/")[0];
  const type = document.location.href.substring(27).split("/")[1];
  const movieID = document.location.href.substring(27).split("/")[2];

  const { data, refresh } = useGetSingleMovie({
    token,
    type,
    movieID,
  });
  const movie = data?.movie ? data.movie[0] : "";

  const moviePlataform = `Plataforma: ${movie?.plataform}`;
  const moviePlataformLabel = "Plataforma:";
  const movieOrderValue = `Orden de prioridad: ${movie.order_value}`;
  const movieUrl = "Enlace: ";
  const noUrl = "Sin enlace";

  const movieCreated_at = new Date(movie?.created_at);
  const created_at = movieCreated_at.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const movieCreatedInLine = `Añadida por ${movie?.username} el ${created_at}`;

  const [showEditForm, setShowEditForm] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [response, setResponse] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [message, setMessage] = useState("");

  const [photo, setPhoto] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [plataform, setPlataform] = useState("");
  const [error, setError] = useState("");

  const photoAnswer = "¿Estás seguro de que quieres modificar la foto?";
  const titleAnswer = "¿Estás seguro de que quieres modificar el título?";
  const urlAnswer = "¿Estás seguro de que quieres modificar el enlace?";
  const plataformAnswer =
    "¿Estás seguro de que quieres modificar la plataforma?";

  const deleteMovieAnswer = "¿Estás seguro de que quieres borrarlo?";

  const photoResponse = "Foto modificada.";
  const titleResponse = "Título modificado.";
  const urlResponse = "Enlace modificado.";
  const plataformResponse = "Plataforma modificada.";
  const deleteMovieResponse = "Película eliminada.";

  // HandlesClick
  const handleGoEditInfo = () => {
    setShowEditForm(!showEditForm);
    setTitle("");
    setPhoto("");
    setFilePreview("");
    setError("");
  };
  const handleReturnBack = () => {
    navigate(`/room/${roomTitle}`);
  };
  const handleDeleteMovie = () => {
    setAnswer(deleteMovieAnswer);
    setShowAnswerModal(true);
  };

  const checkOrDescheck = "descheck";
  const handleSetIsCheck = async () => {
    await setIsCheckService(token, type, movieID, checkOrDescheck);
    refresh();
  };

  // HandlesChange
  const handleChangeEditPhoto = (e) => {
    setPhoto(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  // HandlesForm
  const handleFormEditPhoto = (e) => {
    e.preventDefault();
    setAnswer(photoAnswer);
    setShowAnswerModal(true);
  };
  const handleFormEditTitle = (e) => {
    e.preventDefault();
    setAnswer(titleAnswer);
    setShowAnswerModal(true);
  };
  const handleFormEditUrl = (e) => {
    e.preventDefault();
    setAnswer(urlAnswer);
    setShowAnswerModal(true);
  };
  const handleFormEditPlataform = (e) => {
    e.preventDefault();
    setAnswer(plataformAnswer);
    setShowAnswerModal(true);
  };

  // Functions
  const patchTitle = async () => {
    try {
      await patchMovieService(token, type, movieID, { title });
      setMessage(titleResponse);
      setShowConfirmModal(true);
      setError("");
      setTitle("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowEditForm(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };
  response && answer === titleAnswer && patchTitle() && setResponse(false);

  const patchPhoto = async () => {
    try {
      await patchPostAvatarService(token, {
        postId: movieID,
        postType: type,
        postAvatar: photo,
      });
      setMessage(photoResponse);
      setShowConfirmModal(true);
      setError("");
      setPhoto("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowEditForm(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };
  response && answer === photoAnswer && patchPhoto() && setResponse(false);

  const patchUrl = async () => {
    try {
      await patchMovieService(token, type, movieID, { url });
      setMessage(urlResponse);
      setShowConfirmModal(true);
      setError("");
      setUrl("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowEditForm(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };
  response && answer === urlAnswer && patchUrl() && setResponse(false);

  const patchPlataform = async () => {
    try {
      await patchMovieService(token, type, movieID, { plataform });
      setMessage(plataformResponse);
      setShowConfirmModal(true);
      setError("");
      setPlataform("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowEditForm(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };
  response &&
    answer === plataformAnswer &&
    patchPlataform() &&
    setResponse(false);

  const deleteMovie = async () => {
    try {
      await deleteMovieService(token, type, movieID);
      setMessage(deleteMovieResponse);
      setShowConfirmModal(true);
      setError("");
      setTitle("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowEditForm(false);
        setMessage("");
        navigate(`/room/${roomTitle}`);
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };
  response &&
    answer === deleteMovieAnswer &&
    deleteMovie() &&
    setResponse(false);

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
    <>
      {access ? (
        <section className="movie-page">
          <section
            className={`movie-card ${movie.is_check === 1 && "check-card"}`}
          >
            <section className="movie-icon-wrap">
              <section className="movie-first-icons">
                {movie.is_check === 1 && (
                  <button
                    type="button"
                    className="icon-button"
                    title="Marcar como no vista"
                    onClick={handleSetIsCheck}
                  >
                    <SvgIcon
                      className="icon"
                      component={RemoveRedEyeIcon}
                      inheritViewBox
                    />
                  </button>
                )}
                <button
                  type="button"
                  className="icon-button"
                  title="Editar"
                  onClick={handleGoEditInfo}
                >
                  <SvgIcon
                    className="icon"
                    component={ModeEditIcon}
                    inheritViewBox
                  />
                </button>

                <button
                  type="button"
                  className="icon-button"
                  title="Borrar"
                  onClick={handleDeleteMovie}
                >
                  <SvgIcon
                    className="icon"
                    component={DeleteIcon}
                    inheritViewBox
                  />
                </button>
              </section>

              <button
                type="button"
                className="icon-button"
                title="Volver"
                onClick={handleReturnBack}
              >
                <SvgIcon
                  className="icon"
                  component={KeyboardReturnIcon}
                  inheritViewBox
                />
              </button>
            </section>

            <section className="movie-data">
              <section className="movie-header">
                {!showEditForm ? (
                  <h2 className="movie-title">{movie?.title}</h2>
                ) : (
                  <form className="movie-form" onSubmit={handleFormEditTitle}>
                    <fieldset className="movie-fieldset">
                      <input
                        type="text"
                        className="movie-title movie-input"
                        name="post-title"
                        id="post-title"
                        autoComplete="off"
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />

                      <button
                        type="submit"
                        className="icon-button send-movie-button"
                      >
                        <SvgIcon
                          className="icon"
                          component={SendIcon}
                          inheritViewBox
                        />
                      </button>
                    </fieldset>
                  </form>
                )}

                {!showEditForm ? (
                  movie?.photo ? (
                    <img
                      className="movie-photo"
                      src={`${import.meta.env.VITE_BACKEND}uploads/${
                        movie?.photo
                      }`}
                      alt={movie?.title}
                    />
                  ) : (
                    <section className="movie-default-wrap">
                      <SvgIcon
                        className="avatar-icon movie-icon"
                        component={HideImageIcon}
                        inheritViewBox
                      />
                    </section>
                  )
                ) : (
                  <form className="photo-form" onSubmit={handleFormEditPhoto}>
                    <fieldset className="photo-fieldset">
                      <label className="photo-label">
                        <input
                          className="photo-input"
                          type="file"
                          title="Editar foto"
                          name="edit-movie-image"
                          id="edit-movie-image"
                          onChange={handleChangeEditPhoto}
                        />
                        {filePreview ? (
                          <img
                            className="photo-preview"
                            src={filePreview}
                            alt="photo-preview"
                          />
                        ) : (
                          <SvgIcon
                            className="add-avatar-icon"
                            component={ImageSearchIcon}
                            inheritViewBox
                          />
                        )}
                      </label>
                    </fieldset>

                    <button
                      type="submit"
                      className="icon-button send-photo-movie"
                    >
                      <SvgIcon
                        className="icon"
                        component={SendIcon}
                        inheritViewBox
                      />
                    </button>
                  </form>
                )}
              </section>

              <ul className="movie-info">
                <li>
                  {!showEditForm ? (
                    <p className="movie-plataform">{moviePlataform}</p>
                  ) : (
                    <form
                      className="movie-form"
                      onSubmit={handleFormEditPlataform}
                    >
                      <fieldset className="movie-fieldset select">
                        <label>{moviePlataformLabel}</label>

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

                        <button type="submit" className="icon-button">
                          <SvgIcon
                            className="icon"
                            component={SendIcon}
                            inheritViewBox
                          />
                        </button>
                      </fieldset>
                    </form>
                  )}
                </li>
                <li className={!showEditForm && "movie-plataform"}>
                  {movieUrl}
                  {!showEditForm ? (
                    movie?.url === "" ? (
                      <p>{noUrl}</p>
                    ) : (
                      <a
                        href={movie?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {movie?.url}
                      </a>
                    )
                  ) : (
                    <form className="movie-form" onSubmit={handleFormEditUrl}>
                      <fieldset className="movie-fieldset">
                        <input
                          type="text"
                          className="movie-title movie-input"
                          name="post-title"
                          id="post-title"
                          autoComplete="off"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />

                        <button
                          type="submit"
                          className="icon-button send-movie-button"
                        >
                          <SvgIcon
                            className="icon"
                            component={SendIcon}
                            inheritViewBox
                          />
                        </button>
                      </fieldset>
                    </form>
                  )}
                </li>
                {movie.is_check === 0 && (
                  <li className="movie-plataform">{movieOrderValue}</li>
                )}

                <li
                  className={`created_at ${
                    movie.is_check === 1 && "check-created"
                  }`}
                >
                  {movieCreatedInLine}
                </li>
              </ul>
            </section>

            {error ? <p className="error">⚠️ {error}</p> : null}

            {showAnswerModal && (
              <AnswerModal
                answer={answer}
                setResponse={setResponse}
                setShowAnswerModal={setShowAnswerModal}
              />
            )}

            {showConfirmModal && <ConfirmModal message={message} />}
          </section>
        </section>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};
