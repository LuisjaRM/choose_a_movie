export const acceptFriendService = async (token, username) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}accept-friend/${username}`,
    {
      method: "PATCH",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
