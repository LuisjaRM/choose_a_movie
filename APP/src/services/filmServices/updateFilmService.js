export const updateFilmService = async (
  token,
  type,
  filmID,
  { title, platform, url, upOrdown, checkOrDescheck, photo }
) => {
  let headers;
  let body;

  if (photo) {
    headers = { Authorization: token };
    body = new FormData();
    body.append("photo", photo);
  } else {
    headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    body = JSON.stringify({
      title,
      platform,
      url,
      upOrdown,
      checkOrDescheck,
    });
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/films/update/${type}/${filmID}`,
    {
      method: "PATCH",
      headers: headers,
      body: body,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
