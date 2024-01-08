export const recoverPasswordService = async ({ username, email }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/auth/password/recovery`,
    {
      method: "POST",
      body: JSON.stringify({ username, email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
