export const patchRoomAvatarService = async (token, { roomID, roomAvatar }) => {
  const body = new FormData();
  body.append("avatar", roomAvatar);

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}room-avatar/${roomID}`,
    {
      method: "PATCH",
      headers: { Authorization: token },
      body: body,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
