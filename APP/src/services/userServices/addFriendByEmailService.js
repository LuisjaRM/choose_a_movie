export const addFriendByEmailService = async (token, regCode) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}accept-email-friend/${regCode}`,
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
