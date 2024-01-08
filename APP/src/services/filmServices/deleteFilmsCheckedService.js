export const deleteFilmsCheckedService = async (token, type) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/films/checked/${type}`,
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
