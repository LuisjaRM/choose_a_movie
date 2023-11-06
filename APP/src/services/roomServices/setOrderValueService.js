export const setOrderValueService = async (token, type, movieID, upOrdown) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}set-order-value/${type}/${movieID}`,
    {
      method: "PATCH",
      body: JSON.stringify({ upOrdown }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
