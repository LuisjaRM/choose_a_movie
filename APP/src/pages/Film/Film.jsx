import "./Film.css";

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
import { useSingleFilm } from "../../services/filmServices/useSingleFilm";
import { updateFilmService } from "../../services/filmServices/updateFilmService";
import { deleteFilmService } from "../../services/filmServices/deleteFilmService";

export const Film = () => {
  // Const

  // Href
  const pageHREF = document.location.href.substring(22);
  const roomTitle = pageHREF.split("/")[1];
  const type = pageHREF.split("/")[2];
  const filmID = pageHREF.split("/")[3];

  // Imports
  const { userRooms, token } = useAuth();
  const navigate = useNavigate();
  const { data, refresh } = useSingleFilm(token, {
    type,
    filmID,
  });

  // Access
  const [access, setAcces] = useState("init");
  const [roomID, setRoomID] = useState("");
  useEffect(() => {
    let userRoomsID = [];

    userRooms?.forEach((room) => {
      if (room.title === roomTitle) {
        userRoomsID.push(room.id);
        setRoomID(room.id);
      }
    });

    userRoomsID.includes(roomID) ? setAcces(true) : setAcces(false);
  }, [userRooms, roomTitle, roomID]);

  const film = data?.film ? data.film[0] : "";

  const filmplatform = `platforma: ${film?.platform}`;
  const filmplatformLabel = "platforma:";
  const filmOrderValue = `Orden de prioridad: ${film.order_value}`;
  const filmUrl = "Enlace: ";
  const noUrl = "Sin enlace";

  const filmCreated_at = new Date(film?.created_at);
  const created_at = filmCreated_at.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const filmCreatedInLine = `Añadida por ${film?.username} el ${created_at}`;

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
  const [platform, setplatform] = useState("");
  const [error, setError] = useState("");

  // Document Title
  document.title = `${film.title}`;

  const photoAnswer = "¿Estás seguro de que quieres modificar la foto?";
  const titleAnswer = "¿Estás seguro de que quieres modificar el título?";
  const urlAnswer = "¿Estás seguro de que quieres modificar el enlace?";
  const platformAnswer = "¿Estás seguro de que quieres modificar la platforma?";

  const deleteFilmAnswer = "¿Estás seguro de que quieres borrarlo?";

  const photoResponse = "Foto modificada.";
  const titleResponse = "Título modificado.";
  const urlResponse = "Enlace modificado.";
  const platformResponse = "platforma modificada.";
  const deleteFilmResponse = "Película eliminada.";

  // HandlesClick
  const handleGoEditInfo = () => {
    setShowEditForm(!showEditForm);
    setTitle("");
    setPhoto("");
    setFilePreview("");
    setError("");
  };
  const handleReturnBack = () => {
    navigate(`/sala/${roomID}`);
  };
  const handleDeleteFilm = () => {
    setAnswer(deleteFilmAnswer);
    setShowAnswerModal(true);
  };

  const checkOrDescheck = "descheck";
  const handleSetIsCheck = async () => {
    await updateFilmService(token, type, filmID, { checkOrDescheck });
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
  const handleFormEditplatform = (e) => {
    e.preventDefault();
    setAnswer(platformAnswer);
    setShowAnswerModal(true);
  };

  // Functions
  const changeTitle = async () => {
    try {
      await updateFilmService(token, type, filmID, { title });
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
  response && answer === titleAnswer && changeTitle() && setResponse(false);

  const changePhoto = async () => {
    try {
      await updateFilmService(token, type, filmID, { photo });
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
  response && answer === photoAnswer && changePhoto() && setResponse(false);

  const changeUrl = async () => {
    try {
      await updateFilmService(token, type, filmID, { url });
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
  response && answer === urlAnswer && changeUrl() && setResponse(false);

  const changeplatform = async () => {
    try {
      await updateFilmService(token, type, filmID, { platform });
      setMessage(platformResponse);
      setShowConfirmModal(true);
      setError("");
      setplatform("");
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
    answer === platformAnswer &&
    changeplatform() &&
    setResponse(false);

  const deleteFilm = async () => {
    try {
      await deleteFilmService(token, type, filmID);
      setMessage(deleteFilmResponse);
      setShowConfirmModal(true);
      setError("");
      setTitle("");
      refresh();

      setTimeout(() => {
        setShowConfirmModal(false);
        setShowEditForm(false);
        setMessage("");
        navigate(`/sala/${roomID}`);
      }, 3000);
    } catch (error) {
      setError(error.message);
      setResponse(false);
    }
  };
  response && answer === deleteFilmAnswer && deleteFilm() && setResponse(false);

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
            className={`movie-card ${film.is_check === 1 && "check-card"}`}
          >
            <section className="movie-icon-wrap">
              <section className="movie-first-icons">
                {film.is_check === 1 && (
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
                  onClick={handleDeleteFilm}
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
                  <h2 className="movie-title">{film?.title}</h2>
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
                  film?.photo ? (
                    <img
                      className="movie-photo"
                      src={`${import.meta.env.VITE_BACKEND}uploads/${
                        film?.photo
                      }`}
                      alt={film?.title}
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
                    <p className="movie-platform">{filmplatform}</p>
                  ) : (
                    <form
                      className="movie-form"
                      onSubmit={handleFormEditplatform}
                    >
                      <fieldset className="movie-fieldset select">
                        <label>{filmplatformLabel}</label>

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
                <li className={!showEditForm && "movie-platform"}>
                  {filmUrl}
                  {!showEditForm ? (
                    film?.url === "" ? (
                      <p>{noUrl}</p>
                    ) : (
                      <a
                        href={film?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {film?.url}
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
                {film.is_check === 0 && (
                  <li className="movie-platform">{filmOrderValue}</li>
                )}

                <li
                  className={`created_at ${
                    film.is_check === 1 && "check-created"
                  }`}
                >
                  {filmCreatedInLine}
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
