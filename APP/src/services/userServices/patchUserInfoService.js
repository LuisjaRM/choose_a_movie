export const patchUserInfoService = async (
  { avatar, username, email, phone },
  token
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

  const response = await fetch(`${import.meta.env.VITE_BACKEND}edit-profile`, {
    method: "PATCH",
    headers: headers,
    body: body,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
