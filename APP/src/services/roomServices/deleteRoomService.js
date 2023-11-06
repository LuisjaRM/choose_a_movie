export const deleteRoomService = async (token, roomTitle) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}delete-room/${roomTitle}`,
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
