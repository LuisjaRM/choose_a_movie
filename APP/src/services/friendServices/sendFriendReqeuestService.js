export const sendFriendReqeuestService = async (token, { username, email }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/friends`,
    {
      method: "POST",
      body: JSON.stringify({ username, email }),
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
