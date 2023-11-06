export const patchMovieService = async (
  token,
  type,
  movieID,
  { title, plataform, url }
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}set-movie/${type}/${movieID}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title, plataform, url }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
