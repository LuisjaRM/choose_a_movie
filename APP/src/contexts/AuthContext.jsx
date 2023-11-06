import { createContext, useContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [userFriends, setUserFriends] = useState(null);
  const [userRooms, setUserRooms] = useState(null);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  useMemo(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useMemo(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}my-profile`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      const data = json.data;

      setUser(data);
    } catch (error) {
      setToken("");
      setUser(null);
    }
  }, [token]);

  useMemo(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}get-friends`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      const data = json.data;

      setUserFriends(data);
    } catch (error) {
      setToken("");
      setUser(null);
    }
  }, [token]);

  useMemo(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}get-my-rooms`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      const data = json.data;

      setUserRooms(data);
    } catch (error) {
      setToken("");
      setUser(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, user, userFriends, userRooms, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
