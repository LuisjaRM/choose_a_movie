export const acceptRequestRoomService = async (token, room, username) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}accept-request/${room}`,
    {
      method: "PATCH",
      body: JSON.stringify({ username }),
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
