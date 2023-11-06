export const getValidateService = async ({ regCode }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}validate/${regCode}`,
    {}
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};
