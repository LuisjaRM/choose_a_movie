export const addFilmService = async (
  token,
  roomID,
  { url, title, platform, type }
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/films/${roomID}`,
    {
      method: "POST",
      body: JSON.stringify({ url, title, platform, type }),
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
