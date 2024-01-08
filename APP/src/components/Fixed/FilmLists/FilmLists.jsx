import "./FilmLists.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Components
import { AddFilm } from "../../Modals/AddFilm/AddFilm";
import { FilmAvatar } from "../../Modals/FilmAvatar/FilmAvatar";
// Material icons
import { SvgIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// React imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { useRoomFilms } from "../../../services/filmServices/useRoomFilms";
import { updateFilmService } from "../../../services/filmServices/updateFilmService";
import { deleteFilmsCheckedService } from "../../../services/filmServices/deleteFilmsCheckedService";

export const FilmLists = ({ roomID, roomTitle }) => {
  // Const
  const moviesTitle = "Películas";
  const seriesTitle = "Series";
  const documentariesTitle = "Documentales";
  const videosTitle = "Otros";
  const DeleteIsChecked = "Borrar las ya vistas";

  // States
  const [postId, setPostId] = useState("");
  const [postType, setPostType] = useState("");

  const [showAddFilm, setShowAddFilm] = useState(false);
  const [showAddAvatarForm, setShowFilmAvatar] = useState(false);
  const [openMoviesList, setOpenMoviesList] = useState(false);
  const [openSeriesList, setOpenSeriesList] = useState(false);
  const [openDocumentariesList, setOpenDocumentariesList] = useState(false);
  const [openVideosList, setOpenVideosList] = useState(false);

  const [type, setType] = useState("");
  const [filmID, setFilmID] = useState("");
  const [upOrdown, setUporDown] = useState("");
  const [isCheck, SetIsCheck] = useState(false);
  const [checkOrDescheck, setCheckOrDescheck] = useState("");
  const [deleteIsChecked, setDeleteIsChecked] = useState(false);

  // Imports
  const navigate = useNavigate();
  const { token } = useAuth();
  const { data, refresh } = useRoomFilms(token, roomID);

  const moviesNotCheck = data.movies?.filter((movie) => movie.order_value != 0);
  const topMovies = moviesNotCheck?.filter(
    (movie) => movie.order_value > moviesNotCheck.length - 3
  );
  const allMovies = data?.movies;

  const seriesNotCheck = data.series?.filter((serie) => serie.order_value != 0);
  const topSeries = seriesNotCheck?.filter(
    (serie) => serie.order_value > seriesNotCheck.length - 3
  );
  const allSeries = data?.series;

  const documentariesNotCheck = data.documentaries?.filter(
    (documentary) => documentary.order_value != 0
  );
  const topDocumentaries = documentariesNotCheck?.filter(
    (documentary) => documentary.order_value > documentariesNotCheck.length - 3
  );
  const allDocumentaries = data?.documentaries;

  const videosNotCheck = data.videos?.filter((video) => video.order_value != 0);
  const topVideos = videosNotCheck?.filter(
    (video) => video.order_value > videosNotCheck.length - 3
  );
  const allVideos = data?.videos;

  // HandlesClick
  const handleClickShowAddFilm = () => {
    setShowAddFilm(!showAddFilm);
  };
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickMoviesList = () => {
    setOpenMoviesList(!openMoviesList);
  };
  const handleClickSeriesList = () => {
    setOpenSeriesList(!openSeriesList);
  };
  const handleClickDocumentariesList = () => {
    setOpenDocumentariesList(!openDocumentariesList);
  };
  const handleClickVideosList = () => {
    setOpenVideosList(!openVideosList);
  };

  // Functions
  const setOrderValue = async () => {
    await updateFilmService(token, type, filmID, { upOrdown });
    refresh();
    setType("");
    setFilmID("");
    setUporDown("");
  };
  upOrdown != "" && setOrderValue();

  const setFilmIsCheck = async () => {
    await updateFilmService(token, type, filmID, { checkOrDescheck });
    refresh();
    SetIsCheck(false);
    setCheckOrDescheck("");
    setType("");
    setFilmID("");
  };
  isCheck && setFilmIsCheck();

  const deleteFilmChecked = async () => {
    type === "movies" && (await deleteFilmsCheckedService(token, type));
    type === "series" && (await deleteFilmsCheckedService(token, type));
    type === "documentaries" && (await deleteFilmsCheckedService(token, type));
    type === "videos" && (await deleteFilmsCheckedService(token, type));

    refresh();
    setDeleteIsChecked(false);
    setType("");
    setFilmID("");
  };
  deleteIsChecked && deleteFilmChecked();

  return (
    <>
      <section className="form-section">
        {showAddFilm ? (
          <section className="modal-back dark" onClick={handleClickShowAddFilm}>
            <section className="modal-body small" onClick={handleClickModal}>
              <AddFilm
                setShowFilmAvatar={setShowFilmAvatar}
                roomID={roomID}
                setPostId={setPostId}
                setPostType={setPostType}
              />

              {showAddAvatarForm && (
                <FilmAvatar
                  setShowAddFilm={setShowAddFilm}
                  setShowFilmAvatar={setShowFilmAvatar}
                  type={postType}
                  filmID={postId}
                  refresh={refresh}
                />
              )}
            </section>
          </section>
        ) : (
          <button
            type="button"
            className="add-button"
            onClick={handleClickShowAddFilm}
          >
            <SvgIcon
              className="icon element-icon"
              component={AddIcon}
              inheritViewBox
            />
          </button>
        )}
      </section>

      <section className="film-lists">
        <section className={`film-list ${openMoviesList && "open"}`}>
          <h2 className="film-list-title" onClick={handleClickMoviesList}>
            {moviesTitle}
          </h2>
          <ol>
            {topMovies?.length < 1 && !openMoviesList && (
              <>
                <li></li>
                <li></li>
                <li></li>
              </>
            )}
            {topMovies?.length === 1 && !openMoviesList && (
              <>
                {topMovies?.map((movie) => (
                  <li
                    key={movie.id}
                    className="movie-li"
                    onClick={() =>
                      navigate(`/sala/${roomTitle}/movies/${movie.id}`)
                    }
                  >
                    <p
                      className={`${!openMoviesList && "movie-title-overflow"}`}
                    >
                      {movie.title}
                    </p>
                  </li>
                ))}
                <li></li>
                <li></li>
              </>
            )}
            {topMovies?.length === 2 && !openMoviesList && (
              <>
                {topMovies?.map((movie) => (
                  <li
                    key={movie.id}
                    className="movie-li"
                    onClick={() =>
                      navigate(`/sala/${roomTitle}/movies/${movie.id}`)
                    }
                  >
                    <p
                      className={`${!openMoviesList && "movie-title-overflow"}`}
                    >
                      {movie.title}
                    </p>
                  </li>
                ))}
                <li></li>
              </>
            )}
            {topMovies?.length > 2 &&
              !openMoviesList &&
              topMovies?.map((movie) => (
                <li
                  key={movie.id}
                  className="movie-li"
                  onClick={() =>
                    navigate(`/sala/${roomTitle}/movies/${movie.id}`)
                  }
                >
                  <p className={`${!openMoviesList && "movie-title-overflow"}`}>
                    {movie.title}
                  </p>
                </li>
              ))}
            {openMoviesList && (
              <>
                {allMovies?.map((movie) => (
                  <li
                    key={movie.id}
                    onClick={() =>
                      navigate(`/sala/${roomTitle}/movies/${movie.id}`)
                    }
                  >
                    {movie.is_check === 0 ? (
                      <section className="movie">
                        <p>{movie.title}</p>

                        <section className="buttons-wrap">
                          <button
                            className="icon-button"
                            title="Marcar como vista"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("movies");
                              setFilmID(movie.id);
                              SetIsCheck(true);
                              setCheckOrDescheck("check");
                            }}
                          >
                            <SvgIcon
                              className="icon element-icon"
                              component={CheckBoxOutlineBlankIcon}
                              inheritViewBox
                            />
                          </button>

                          <button
                            className="icon-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("movies");
                              setFilmID(movie.id);
                              setUporDown("up");
                            }}
                          >
                            <SvgIcon
                              className="icon element-icon"
                              component={ArrowUpwardIcon}
                              inheritViewBox
                            />
                          </button>

                          <button
                            className="icon-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("movies");
                              setFilmID(movie.id);
                              setUporDown("down");
                            }}
                          >
                            <SvgIcon
                              className="icon element-icon"
                              component={ArrowDownwardIcon}
                              inheritViewBox
                            />
                          </button>
                        </section>
                      </section>
                    ) : (
                      <section className="movie check">
                        <p>{movie.title}</p>

                        <section className="buttons-wrap">
                          <button
                            className="icon-button"
                            title="Marcar como vista"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("movies");
                              setFilmID(movie.id);
                              SetIsCheck(true);
                              setCheckOrDescheck("descheck");
                            }}
                          >
                            <SvgIcon
                              className="icon check-icon"
                              component={CheckBoxIcon}
                              inheritViewBox
                            />
                          </button>
                        </section>
                      </section>
                    )}
                  </li>
                ))}
                {allMovies.length != 0 && (
                  <section className="button-section">
                    <button
                      type="button"
                      className="no-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setType("movies");
                        setDeleteIsChecked(true);
                      }}
                    >
                      {DeleteIsChecked}
                    </button>
                  </section>
                )}
              </>
            )}
          </ol>
        </section>

        <section className={`film-list ${openSeriesList && "open"}`}>
          <h2 className="film-list-title" onClick={handleClickSeriesList}>
            {seriesTitle}
          </h2>
          <ol>
            {topSeries?.length < 1 && !openSeriesList && (
              <>
                <li></li>
                <li></li>
                <li></li>
              </>
            )}
            {topSeries?.length === 1 && !openSeriesList && (
              <>
                {topSeries?.map((serie) => (
                  <li
                    key={serie.id}
                    className="movie-li"
                    onClick={() =>
                      navigate(`/sala/${roomTitle}/series/${serie.id}`)
                    }
                  >
                    <p
                      className={`${!openSeriesList && "movie-title-overflow"}`}
                    >
                      {serie.title}
                    </p>
                  </li>
                ))}
                <li></li>
                <li></li>
              </>
            )}
            {topSeries?.length === 2 && !openSeriesList && (
              <>
                {topSeries?.map((serie) => (
                  <li
                    key={serie.id}
                    className="movie-li"
                    onClick={() =>
                      navigate(`/sala/${roomTitle}/series/${serie.id}`)
                    }
                  >
                    <p
                      className={`${!openSeriesList && "movie-title-overflow"}`}
                    >
                      {serie.title}
                    </p>
                  </li>
                ))}
                <li></li>
              </>
            )}
            {topSeries?.length > 2 &&
              !openSeriesList &&
              topSeries?.map((serie) => (
                <li
                  key={serie.id}
                  className="movie-li"
                  onClick={() =>
                    navigate(`/sala/${roomTitle}/series/${serie.id}`)
                  }
                >
                  <p className={`${!openSeriesList && "movie-title-overflow"}`}>
                    {serie.title}
                  </p>
                </li>
              ))}
            {openSeriesList && (
              <>
                {allSeries?.map((serie) => (
                  <li
                    key={serie.id}
                    onClick={() =>
                      navigate(`/sala/${roomTitle}/series/${serie.id}`)
                    }
                  >
                    {serie.is_check === 0 ? (
                      <section className="movie">
                        <p>{serie.title}</p>

                        <section className="buttons-wrap">
                          <button
                            className="icon-button"
                            title="Marcar como vista"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("series");
                              setFilmID(serie.id);
                              SetIsCheck(true);
                              setCheckOrDescheck("check");
                            }}
                          >
                            <SvgIcon
                              className="icon"
                              component={CheckBoxOutlineBlankIcon}
                              inheritViewBox
                            />
                          </button>

                          <button
                            className="icon-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("series");
                              setFilmID(serie.id);
                              setUporDown("up");
                            }}
                          >
                            <SvgIcon
                              className="icon"
                              component={ArrowUpwardIcon}
                              inheritViewBox
                            />
                          </button>

                          <button
                            className="icon-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("series");
                              setFilmID(serie.id);
                              setUporDown("down");
                            }}
                          >
                            <SvgIcon
                              className="icon"
                              component={ArrowDownwardIcon}
                              inheritViewBox
                            />
                          </button>
                        </section>
                      </section>
                    ) : (
                      <section className="movie check">
                        <p>{serie.title}</p>

                        <section className="buttons-wrap">
                          <button
                            className="icon-button"
                            title="Marcar como vista"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("series");
                              setFilmID(serie.id);
                              SetIsCheck(true);
                              setCheckOrDescheck("descheck");
                            }}
                          >
                            <SvgIcon
                              className="icon check-icon"
                              component={CheckBoxIcon}
                              inheritViewBox
                            />
                          </button>
                        </section>
                      </section>
                    )}
                  </li>
                ))}
                {allSeries.length != 0 && (
                  <section className="button-section">
                    <button
                      type="button"
                      className="no-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setType("series");
                        setDeleteIsChecked(true);
                      }}
                    >
                      {DeleteIsChecked}
                    </button>
                  </section>
                )}
              </>
            )}
          </ol>
        </section>

        <section className={`film-list ${openDocumentariesList && "open"}`}>
          <h2
            className="film-list-title"
            onClick={handleClickDocumentariesList}
          >
            {documentariesTitle}
          </h2>
          <ol>
            {topDocumentaries?.length < 1 && !openDocumentariesList && (
              <>
                <li></li>
                <li></li>
                <li></li>
              </>
            )}
            {topDocumentaries?.length === 1 && !openDocumentariesList && (
              <>
                {topDocumentaries?.map((documentary) => (
                  <li
                    key={documentary.id}
                    className="movie-li"
                    onClick={() =>
                      navigate(
                        `/sala/${roomTitle}/documentaries/${documentary.id}`
                      )
                    }
                  >
                    <p
                      className={`${
                        !openDocumentariesList && "movie-title-overflow"
                      }`}
                    >
                      {documentary.title}
                    </p>
                  </li>
                ))}
                <li></li>
                <li></li>
              </>
            )}
            {topDocumentaries?.length === 2 && !openDocumentariesList && (
              <>
                {topDocumentaries?.map((documentary) => (
                  <li
                    key={documentary.id}
                    className="movie-li"
                    onClick={() =>
                      navigate(
                        `/sala/${roomTitle}/documentaries/${documentary.id}`
                      )
                    }
                  >
                    <p
                      className={`${
                        !openDocumentariesList && "movie-title-overflow"
                      }`}
                    >
                      {documentary.title}
                    </p>
                  </li>
                ))}
                <li></li>
              </>
            )}
            {topDocumentaries?.length > 2 &&
              !openDocumentariesList &&
              topDocumentaries?.map((documentary) => (
                <li
                  key={documentary.id}
                  className="movie-li"
                  onClick={() =>
                    navigate(
                      `/sala/${roomTitle}/documentaries/${documentary.id}`
                    )
                  }
                >
                  <p
                    className={`${
                      !openDocumentariesList && "movie-title-overflow"
                    }`}
                  >
                    {documentary.title}
                  </p>
                </li>
              ))}
            {openDocumentariesList && (
              <>
                {allDocumentaries?.map((documentary) => (
                  <li
                    key={documentary.id}
                    onClick={() =>
                      navigate(
                        `/sala/${roomTitle}/documentaries/${documentary.id}`
                      )
                    }
                  >
                    {documentary.is_check === 0 ? (
                      <section className="movie">
                        <p>{documentary.title}</p>

                        <section className="buttons-wrap">
                          <button
                            className="icon-button"
                            title="Marcar como vista"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("documentaries");
                              setFilmID(documentary.id);
                              SetIsCheck(true);
                              setCheckOrDescheck("check");
                            }}
                          >
                            <SvgIcon
                              className="icon"
                              component={CheckBoxOutlineBlankIcon}
                              inheritViewBox
                            />
                          </button>

                          <button
                            className="icon-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("documentaries");
                              setFilmID(documentary.id);
                              setUporDown("up");
                            }}
                          >
                            <SvgIcon
                              className="icon"
                              component={ArrowUpwardIcon}
                              inheritViewBox
                            />
                          </button>

                          <button
                            className="icon-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("documentaries");
                              setFilmID(documentary.id);
                              setUporDown("down");
                            }}
                          >
                            <SvgIcon
                              className="icon"
                              component={ArrowDownwardIcon}
                              inheritViewBox
                            />
                          </button>
                        </section>
                      </section>
                    ) : (
                      <section className="movie check">
                        <p>{documentary.title}</p>

                        <section className="buttons-wrap">
                          <button
                            className="icon-button"
                            title="Marcar como vista"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("documentaries");
                              setFilmID(documentary.id);
                              SetIsCheck(true);
                              setCheckOrDescheck("descheck");
                            }}
                          >
                            <SvgIcon
                              className="icon check-icon"
                              component={CheckBoxIcon}
                              inheritViewBox
                            />
                          </button>
                        </section>
                      </section>
                    )}
                  </li>
                ))}
                {allDocumentaries.length != 0 && (
                  <section className="button-section">
                    <button
                      type="button"
                      className="no-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setType("documentaries");
                        setDeleteIsChecked(true);
                      }}
                    >
                      {DeleteIsChecked}
                    </button>
                  </section>
                )}
              </>
            )}
          </ol>
        </section>

        <section className={`film-list ${openVideosList && "open"}`}>
          <h2 className="film-list-title" onClick={handleClickVideosList}>
            {videosTitle}
          </h2>
          <ol>
            {topVideos?.length < 1 && !openVideosList && (
              <>
                <li></li>
                <li></li>
                <li></li>
              </>
            )}
            {topVideos?.length === 1 && !openVideosList && (
              <>
                {topVideos?.map((video) => (
                  <li
                    key={video.id}
                    className="movie-li"
                    onClick={() =>
                      navigate(`/sala/${roomTitle}/videos/${video.id}`)
                    }
                  >
                    <p
                      className={`${!openVideosList && "movie-title-overflow"}`}
                    >
                      {video.title}
                    </p>
                  </li>
                ))}
                <li></li>
                <li></li>
              </>
            )}
            {topVideos?.length === 2 && !openVideosList && (
              <>
                {topVideos?.map((video) => (
                  <li
                    key={video.id}
                    className="movie-li"
                    onClick={() =>
                      navigate(`/sala/${roomTitle}/videos/${video.id}`)
                    }
                  >
                    <p
                      className={`${!openVideosList && "movie-title-overflow"}`}
                    >
                      {video.title}
                    </p>
                  </li>
                ))}
                <li></li>
              </>
            )}
            {topVideos?.length > 2 &&
              !openVideosList &&
              topVideos?.map((video) => (
                <li
                  key={video.id}
                  className="movie-li"
                  onClick={() =>
                    navigate(`/sala/${roomTitle}/videos/${video.id}`)
                  }
                >
                  <p className={`${!openVideosList && "movie-title-overflow"}`}>
                    {video.title}
                  </p>
                </li>
              ))}
            {openVideosList && (
              <>
                {allVideos?.map((video) => (
                  <li
                    key={video.id}
                    onClick={() =>
                      navigate(`/sala/${roomTitle}/videos/${video.id}`)
                    }
                  >
                    {video.is_check === 0 ? (
                      <section className="movie">
                        <p>{video.title}</p>

                        <section className="buttons-wrap">
                          <button
                            className="icon-button"
                            title="Marcar como vista"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("videos");
                              setFilmID(video.id);
                              SetIsCheck(true);
                              setCheckOrDescheck("check");
                            }}
                          >
                            <SvgIcon
                              className="icon"
                              component={CheckBoxOutlineBlankIcon}
                              inheritViewBox
                            />
                          </button>

                          <button
                            className="icon-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("videos");
                              setFilmID(video.id);
                              setUporDown("up");
                            }}
                          >
                            <SvgIcon
                              className="icon"
                              component={ArrowUpwardIcon}
                              inheritViewBox
                            />
                          </button>

                          <button
                            className="icon-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("videos");
                              setFilmID(video.id);
                              setUporDown("down");
                            }}
                          >
                            <SvgIcon
                              className="icon"
                              component={ArrowDownwardIcon}
                              inheritViewBox
                            />
                          </button>
                        </section>
                      </section>
                    ) : (
                      <section className="movie check">
                        <p>{video.title}</p>

                        <section className="buttons-wrap">
                          <button
                            className="icon-button"
                            title="Marcar como vista"
                            onClick={(e) => {
                              e.stopPropagation();
                              setType("videos");
                              setFilmID(video.id);
                              SetIsCheck(true);
                              setCheckOrDescheck("descheck");
                            }}
                          >
                            <SvgIcon
                              className="icon check-icon"
                              component={CheckBoxIcon}
                              inheritViewBox
                            />
                          </button>
                        </section>
                      </section>
                    )}
                  </li>
                ))}
                {allVideos.length != 0 && (
                  <section className="button-section">
                    <button
                      type="button"
                      className="no-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setType("videos");
                        setDeleteIsChecked(true);
                      }}
                    >
                      {DeleteIsChecked}
                    </button>
                  </section>
                )}
              </>
            )}
          </ol>
        </section>
      </section>
    </>
  );
};
