export const loginService = async ({ username, password }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
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
