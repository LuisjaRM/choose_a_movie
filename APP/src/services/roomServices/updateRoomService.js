export const updateRoomService = async (token, roomID, { avatar, title }) => {
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
      title,
    });
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}API/v1/rooms/update/${roomID}`,
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
