export const validateService = async (regCode) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/auth/validation/${regCode}`,
    {}
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};
