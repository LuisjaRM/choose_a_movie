import { useEffect, useState } from "react";

const loadUserInfo = async (token, url, setData, setError) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    const data = json.data;

    setData(data);
  } catch (error) {
    setError(error.message);
  }
};

export const useGetData = ({ token, url }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    token != "" && loadUserInfo(token, url, setData, setError);
  }, [token, url]);

  const refresh = () => loadUserInfo(token, url, setData, setError);

  return { data, error, refresh };
};
