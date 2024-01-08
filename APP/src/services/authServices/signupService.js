export const signupService = async ({
  email,
  password,
  repeatPassword,
  username,
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify({ email, password, repeatPassword, username }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};
