export const createRoomService = async (token, roomName) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}create-room`, {
    method: "POST",
    body: JSON.stringify({ roomName }),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};
