export const updateFriendService = async (token, { regCode, username }) => {
  const response = await fetch(
    regCode != undefined
      ? `${import.meta.env.VITE_BACKEND}API/v1/friends/update/${regCode}`
      : `${import.meta.env.VITE_BACKEND}API/v1/friends/update/${username}`,
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

  return json;
};
