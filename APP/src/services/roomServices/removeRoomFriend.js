export const removeRoomFriend = async (token, friendID, roomID) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/rooms/friend/${friendID}/${roomID}`,
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
