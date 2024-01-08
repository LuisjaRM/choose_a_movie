export const updateProfileService = async (
  token,
  { avatar, username, email, phone }
) => {
  let headers;
  let body;

  if (avatar) {
    headers = { Authorization: token };
    body = new FormData();
    body.append("avatar", avatar);
  } else {
    headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    body = JSON.stringify({
      username,
      email,
      phone,
    });
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/users/update`,
    {
      method: "PATCH",
      headers: headers,
      body: body,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
