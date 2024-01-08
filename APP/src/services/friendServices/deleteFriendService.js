export const deleteFriendService = async (token, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/friends/${id}`,
    {
      method: "DELETE",
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
