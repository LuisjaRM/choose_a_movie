export const deleteFilmService = async (token, type, movieID) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/films/film/${type}/${movieID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
