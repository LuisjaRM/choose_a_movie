export const patchPostAvatarService = async (
  token,
  { postId, postType, postAvatar }
) => {
  const body = new FormData();
  body.append("avatar", postAvatar);

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}post-avatar/${postType}/${postId}`,
    {
      method: "PATCH",
      headers: { Authorization: token },
      body: body,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
