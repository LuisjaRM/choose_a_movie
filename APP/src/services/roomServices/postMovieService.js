export const postMovieService = async (
  token,
  roomID,
  { url, title, plataform, type }
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}add-movie/${roomID}`,
    {
      method: "POST",
      body: JSON.stringify({ url, title, plataform, type }),
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

  return json;
};
