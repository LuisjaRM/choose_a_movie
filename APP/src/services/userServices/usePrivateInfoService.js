import { useGetData } from "../../hooks/useGetData";

export const usePrivateInfoService = (token) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/users/private-info`,
  });
