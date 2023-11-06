export const signupService = async ({ email, password, username }) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}new-user`, {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};
