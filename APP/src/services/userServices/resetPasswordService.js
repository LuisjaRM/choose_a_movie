export const resetPasswordService = async ({ recoverCode, newPassword }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}reset-password`,
    {
      method: "POST",
      body: JSON.stringify({ recoverCode, newPassword }),
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
