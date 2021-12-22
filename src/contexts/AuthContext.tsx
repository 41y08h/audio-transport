import axios, { AxiosResponse } from "axios";
import { createContext, FC, useContext } from "react";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import Loading from "../components/Loading";
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
  loginMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      username: string;
      password: string;
    },
    unknown
  >;
  storedUsername: string | null;
  clearStoredUsername: () => void;
}

export const AuthContext = createContext<any>(undefined);

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

export const AuthProvider: FC = ({ children }) => {
  const queryClient = useQueryClient();
  const [storedUsername, setStoredUsername] = useLocalStorage<string | null>(
    "stored-username",
    null
  );
  const currentUserQuery = useQuery(
    "/auth/current-user",
    () => axios.get("/auth/current-user").then((res) => res.data),
    { retry: false, refetchOnWindowFocus: false }
  );
  const registerMutation = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      axios.post("/auth/register", { username, password }),
    {
      onSuccess(res) {
        const user = res.data;
        queryClient.setQueryData("/auth/current-user", user);
        setStoredUsername(user.username);
      },
    }
  );
  const loginMutation = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      axios.post("/auth/login", { username, password }),
    {
      onSuccess(res) {
        const user = res.data;
        queryClient.setQueryData("/auth/current-user", user);
        setStoredUsername(user.username);
      },
    }
  );
  function clearStoredUsername() {
    setStoredUsername(null);
  }

  const value: AuthContextValue = {
    currentUser: currentUserQuery.data,
    registerMutation,
    loginMutation,
    storedUsername,
    clearStoredUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      {currentUserQuery.isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
