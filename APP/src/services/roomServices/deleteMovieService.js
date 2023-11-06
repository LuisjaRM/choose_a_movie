export const deleteMovieService = async (token, type, movieID) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}delete-movie/${type}/${movieID}`,
    {
      method: "PATCH",
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
