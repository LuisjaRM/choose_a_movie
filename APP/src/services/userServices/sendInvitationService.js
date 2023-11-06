export const sendInvitationService = async (token, { roomID, friendID }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}add-friend-room`,
    {
      method: "POST",
      body: JSON.stringify({ roomID, friendID }),
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

  return json;
};
