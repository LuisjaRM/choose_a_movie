export const deleteRoomService = async (token, roomID) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/rooms/room/${roomID}`,
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
