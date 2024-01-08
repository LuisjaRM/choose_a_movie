export const resetPasswordService = async ({
  recoverCode,
  newPassword,
  repeatPassword,
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/auth/password/resetting`,
    {
      method: "POST",
      body: JSON.stringify({ recoverCode, newPassword, repeatPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};
