import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios, { AxiosError } from "axios";

import "./styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import App from "./pages/App";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      async queryFn({ queryKey }) {
        if (typeof queryKey !== "string")
          throw new Error(
            `Query key can only be a string, got \`${typeof queryKey}\``
          );

        const res = await axios.get(queryKey);
        return res.data;
      },
    },
    mutations: {
      onError(error) {
        const {
          response: { data },
        } = error as any;
        if ("error" in data) {
          toast.error(data.error.message);
        }
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/app" component={App} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </BrowserRouter>
        <ToastContainer position="bottom-center" theme="dark" />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
