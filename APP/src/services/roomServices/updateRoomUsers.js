export const updateRoomUsers = async (
  token,
  room,
  { username, hostOrGuest }
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/rooms/update-users/${room}`,
    {
      method: "PATCH",
      body: JSON.stringify({ username, hostOrGuest }),
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
