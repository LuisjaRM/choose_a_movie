export const updateReadNotification = async (token, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/notifications/${id}`,
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
