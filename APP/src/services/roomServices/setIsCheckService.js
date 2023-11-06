export const setIsCheckService = async (
  token,
  type,
  movieID,
  checkOrDescheck
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}set-is-check/${type}/${movieID}`,
    {
      method: "PATCH",
      body: JSON.stringify({ checkOrDescheck }),
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
