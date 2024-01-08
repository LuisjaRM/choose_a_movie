export const deleteAccountService = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}API/v1/users`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
