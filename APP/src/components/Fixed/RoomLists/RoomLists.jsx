import "./RoomLists.css";

// Context
import { useAuth } from "../../../contexts/AuthContext";
// Components
import { AddMovieModal } from "../../Modals/AddMovieModal/AddMovieModal";
import { AddAavatarModal } from "../../Modals/AddAavatarModal/AddAavatarModal";
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
import { useGetMovies } from "../../../services/useGetServices/useGetDataServices";
import { setOrderValueService } from "../../../services/roomServices/setOrderValueService";
import { setIsCheckService } from "../../../services/roomServices/setIsCheckService";
import { deleteMoviesCheckedService } from "../../../services/roomServices/deleteMoviesCheckedService";

export const RoomLists = ({ roomID, roomTitle }) => {
  // Const
  const moviesTitle = "Películas";
  const seriesTitle = "Series";
  const documentariesTitle = "Documentales";
  const videosTitle = "Vídeos";
  const DeleteIsChecked = "Borrar las ya vistas";

  const [postId, setPostId] = useState("");
  const [postType, setPostType] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddAvatarForm, setShowAddAvatarForm] = useState(false);
  const [openMoviesList, setOpenMoviesList] = useState(false);
  const [openSeriesList, setOpenSeriesList] = useState(false);
  const [openDocumentariesList, setOpenDocumentariesList] = useState(false);
  const [openVideosList, setOpenVideosList] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuth();
  const { data, refresh } = useGetMovies({ token, roomID });

  const moviesChecked = data.movies?.filter((movie) => movie.order_value === 0);
  const moviesNotCheck = data.movies?.filter((movie) => movie.order_value != 0);
  const topMovies = moviesNotCheck?.filter(
    (movie) => movie.order_value > moviesNotCheck.length - 3
  );
  const allMovies = data?.movies;

  const seriesChecked = data.series?.filter((serie) => serie.order_value === 0);
  const seriesNotCheck = data.series?.filter((serie) => serie.order_value != 0);
  const topSeries = seriesNotCheck?.filter(
    (serie) => serie.order_value > seriesNotCheck.length - 3
  );
  const allSeries = data?.series;

  const documentariesChecked = data.documentaries?.filter(
    (documentary) => documentary.order_value === 0
  );
  const documentariesNotCheck = data.documentaries?.filter(
    (documentary) => documentary.order_value != 0
  );
  const topDocumentaries = documentariesNotCheck?.filter(
    (documentary) => documentary.order_value > documentariesNotCheck.length - 3
  );
  const allDocumentaries = data?.documentaries;

  const videosChecked = data.videos?.filter((video) => video.order_value === 0);
  const videosNotCheck = data.videos?.filter((video) => video.order_value != 0);
  const topVideos = videosNotCheck?.filter(
    (video) => video.order_value > videosNotCheck.length - 3
  );
  const allVideos = data?.videos;

  // HandlesClick
  const handleClickShowAddForm = () => {
    setShowAddForm(!showAddForm);
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

  const [typeSelected, setTypeSelected] = useState("");
  const [movieSelectedID, setMovieSelectedID] = useState("");
  const [upOrdown, setUporDown] = useState("");
  const [isCheck, SetIsCheck] = useState(false);
  const [checkOrDescheck, setCheckOrDescheck] = useState("");
  const [deleteIsChecked, setDeleteIsChecked] = useState(false);

  const setOrderValue = async () => {
    await setOrderValueService(token, typeSelected, movieSelectedID, upOrdown);
    refresh();
    setTypeSelected("");
    setMovieSelectedID("");
    setUporDown("");
  };
  upOrdown != "" && setOrderValue();

  const setMovieIsCheck = async () => {
    await setIsCheckService(
      token,
      typeSelected,
      movieSelectedID,
      checkOrDescheck
    );
    refresh();
    SetIsCheck(false);
    setCheckOrDescheck("");
    setTypeSelected("");
    setMovieSelectedID("");
  };
  isCheck && setMovieIsCheck();

  const deleteMoviesChecked = async () => {
    typeSelected === "movies" &&
      (await deleteMoviesCheckedService(token, typeSelected, moviesChecked));
    typeSelected === "series" &&
      (await deleteMoviesCheckedService(token, typeSelected, seriesChecked));
    typeSelected === "documentaries" &&
      (await deleteMoviesCheckedService(
        token,
        typeSelected,
        documentariesChecked
      ));
    typeSelected === "videos" &&
      (await deleteMoviesCheckedService(token, typeSelected, videosChecked));

    refresh();
    setDeleteIsChecked(false);
    setTypeSelected("");
    setMovieSelectedID("");
  };
  deleteIsChecked && deleteMoviesChecked();

  return (
    <>
      <section className="form-section">
        {showAddForm ? (
          <section className="modal-back dark" onClick={handleClickShowAddForm}>
            <section className="modal-body small" onClick={handleClickModal}>
              <AddMovieModal
                setShowAddAvatarForm={setShowAddAvatarForm}
                roomID={roomID}
                setPostId={setPostId}
                setPostType={setPostType}
              />

              {showAddAvatarForm && (
                <AddAavatarModal
                  setShowAddForm={setShowAddForm}
                  setShowAddAvatarForm={setShowAddAvatarForm}
                  postId={postId}
                  postType={postType}
                  refresh={refresh}
                />
              )}
            </section>
          </section>
        ) : (
          <button
            type="button"
            className="add-button"
            onClick={handleClickShowAddForm}
          >
            <SvgIcon className="icon add" component={AddIcon} inheritViewBox />
          </button>
        )}
      </section>

      <section className="room-lists">
        <section className={`room-list ${openMoviesList && "open"}`}>
          <h2 className="room-list-title" onClick={handleClickMoviesList}>
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
                      navigate(`/room/${roomTitle}/movies/${movie.id}`)
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
                      navigate(`/room/${roomTitle}/movies/${movie.id}`)
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
                    navigate(`/room/${roomTitle}/movies/${movie.id}`)
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
                      navigate(`/room/${roomTitle}/movies/${movie.id}`)
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
                              setTypeSelected("movies");
                              setMovieSelectedID(movie.id);
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
                              setTypeSelected("movies");
                              setMovieSelectedID(movie.id);
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
                              setTypeSelected("movies");
                              setMovieSelectedID(movie.id);
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
                        <p>{movie.title}</p>

                        <section className="buttons-wrap">
                          <button
                            className="icon-button"
                            title="Marcar como vista"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTypeSelected("movies");
                              setMovieSelectedID(movie.id);
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
                        setTypeSelected("movies");
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

        <section className={`room-list ${openSeriesList && "open"}`}>
          <h2 className="room-list-title" onClick={handleClickSeriesList}>
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
                      navigate(`/room/${roomTitle}/series/${serie.id}`)
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
                      navigate(`/room/${roomTitle}/series/${serie.id}`)
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
                    navigate(`/room/${roomTitle}/series/${serie.id}`)
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
                      navigate(`/room/${roomTitle}/series/${serie.id}`)
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
                              setTypeSelected("series");
                              setMovieSelectedID(serie.id);
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
                              setTypeSelected("series");
                              setMovieSelectedID(serie.id);
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
                              setTypeSelected("series");
                              setMovieSelectedID(serie.id);
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
                              setTypeSelected("series");
                              setMovieSelectedID(serie.id);
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
                        setTypeSelected("series");
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

        <section className={`room-list ${openDocumentariesList && "open"}`}>
          <h2
            className="room-list-title"
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
                        `/room/${roomTitle}/documentaries/${documentary.id}`
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
                        `/room/${roomTitle}/documentaries/${documentary.id}`
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
                      `/room/${roomTitle}/documentaries/${documentary.id}`
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
                        `/room/${roomTitle}/documentaries/${documentary.id}`
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
                              setTypeSelected("documentaries");
                              setMovieSelectedID(documentary.id);
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
                              setTypeSelected("documentaries");
                              setMovieSelectedID(documentary.id);
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
                              setTypeSelected("documentaries");
                              setMovieSelectedID(documentary.id);
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
                              setTypeSelected("documentaries");
                              setMovieSelectedID(documentary.id);
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
                        setTypeSelected("documentaries");
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

        <section className={`room-list ${openVideosList && "open"}`}>
          <h2 className="room-list-title" onClick={handleClickVideosList}>
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
                      navigate(`/room/${roomTitle}/videos/${video.id}`)
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
                      navigate(`/room/${roomTitle}/videos/${video.id}`)
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
                    navigate(`/room/${roomTitle}/videos/${video.id}`)
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
                      navigate(`/room/${roomTitle}/videos/${video.id}`)
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
                              setTypeSelected("videos");
                              setMovieSelectedID(video.id);
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
                              setTypeSelected("videos");
                              setMovieSelectedID(video.id);
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
                              setTypeSelected("videos");
                              setMovieSelectedID(video.id);
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
                              setTypeSelected("videos");
                              setMovieSelectedID(video.id);
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
                        setTypeSelected("videos");
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
