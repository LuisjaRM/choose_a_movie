import { useGetSearch } from "../../hooks/useGetSearch";

export const useSearchFriendService = ({ token, search }) =>
  useGetSearch({
    token,
    url: `${import.meta.env.VITE_BACKEND}search-friend`,
    search,
  });

export const useSearchMyRoomService = ({ token, search }) =>
  useGetSearch({
    token,
    url: `${import.meta.env.VITE_BACKEND}search-my-room`,
    search,
  });

export const useSearchNotMyRoomService = ({ token, search }) =>
  useGetSearch({
    token,
    url: `${import.meta.env.VITE_BACKEND}search-not-my-room`,
    search,
  });
