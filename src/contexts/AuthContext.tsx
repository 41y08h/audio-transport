import axios, { AxiosResponse } from "axios";
import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import useLocalStorage from "../hooks/useLocalStorage";
import IUser from "../interfaces/IUser";

interface AuthContextValue {
  currentUser?: IUser;
  registerMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      username: string;
      password: string;
    },
    unknown
  >;
  registeredAs: string | null;
}

export const AuthContext = createContext<any>(undefined);

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

export const AuthProvider: FC = ({ children }) => {
  const queryClient = useQueryClient();
  const [registeredAs, setRegisteredAs] = useLocalStorage<string | null>(
    "registered-as",
    null
  );
  const currentUserQuery = useQuery(
    "/current-user",
    () => axios.get("/current-user").then((res) => res.data),
    { retry: false, refetchOnWindowFocus: false }
  );
  const registerMutation = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      axios.post("/register", { username, password }),
    {
      onSuccess(res) {
        const user = res.data;
        queryClient.setQueryData("/current-user", user);
        setRegisteredAs(user.username);
      },
    }
  );

  const value: AuthContextValue = {
    currentUser: currentUserQuery.data,
    registerMutation,
    registeredAs,
  };

  return (
    <AuthContext.Provider value={value}>
      {currentUserQuery.isLoading ? (
        <div
          style={{
            backgroundColor: "#202124",
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
