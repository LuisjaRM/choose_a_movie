export const patchPasswordService = async (
  token,
  { oldPassword, newPassword }
) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}set-password`, {
    method: "PATCH",
    body: JSON.stringify({ oldPassword, newPassword }),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
