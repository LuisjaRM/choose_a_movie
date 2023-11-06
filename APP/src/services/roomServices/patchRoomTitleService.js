export const patchRoomTitleService = async (token, { title, roomID }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}set-room-title/${roomID}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title }),
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
