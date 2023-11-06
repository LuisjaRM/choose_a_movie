export const deleteFriendToRoomService = async (token, id, roomTitle) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}delete-friend-to-room/${id}/${roomTitle}`,
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
