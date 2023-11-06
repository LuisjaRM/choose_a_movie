export const sendRequestRoomService = async (token, { roomID }) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}request-room`, {
    method: "POST",
    body: JSON.stringify({ roomID }),
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
