import { createContext, useState } from "react";
import type { User } from "../types";
import { apiClient } from "../clients/api";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  logIn: (username: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logOut: () => void;
  token: string | null;
  setToken: (token: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // Check if there is a token in localStorage and set them in state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const value = localStorage.getItem("user");
      if (value) {
        return JSON.parse(value);
      } else return null;
    } catch (error) {
      console.error(error);
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      const value = localStorage.getItem("token");
      if (value) {
        return JSON.parse(value);
      } else return null;
    } catch (error) {
      console.error(error);
    }
  });

  // useEffect(() => {
  //   try {

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  const logIn = async (email: string, password: string) => {
    try {
      const res = await apiClient.post("/api/users/login", { email, password });
      console.log(res.data);
      // set data in state
      setToken(res.data.token);
      setUser(res.data.user);

      // set data in local storage
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await apiClient.post("/api/users/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {};

  return (
    <AuthContext.Provider
      value={{ user, setUser, logIn, register, logOut, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
