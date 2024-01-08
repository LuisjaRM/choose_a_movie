import { useGetSearch } from "../../hooks/useGetSearch";

export const useSearchUserFriends = (token, { search }) =>
  useGetSearch({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/friends/search`,
    search,
  });
