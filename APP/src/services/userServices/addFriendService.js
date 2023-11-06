export const addFriendService = async (token, { username, email }) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}add-friend`, {
    method: "POST",
    body: JSON.stringify({ username, email }),
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
