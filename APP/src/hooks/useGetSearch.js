import { useCallback, useRef, useState } from "react";

export const useGetSearch = ({ search, token, url }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getSearch = useCallback(
    async (search) => {
      if (search === "" || search === previousSearch.current) {
        return;
      }

      try {
        setError(null);
        previousSearch.current = search;

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ search }),
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message);
        }

        setData(json.data);
      } catch (error) {
        setError(error.message);
      }
    },
    [token, url]
  );

  return { getSearch, data, error };
};
