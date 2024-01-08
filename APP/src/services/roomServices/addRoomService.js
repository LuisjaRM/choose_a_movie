export const addRoomService = async (token, { title }) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}API/v1/rooms`, {
    method: "POST",
    body: JSON.stringify({ title }),
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
