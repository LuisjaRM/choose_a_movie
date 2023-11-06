export const deleteMoviesCheckedService = async (
  token,
  type,
  moviesChecked
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}delete-checked/${type}`,
    {
      method: "PATCH",
      body: JSON.stringify({ moviesChecked }),
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
