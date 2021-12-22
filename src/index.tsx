import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import App from "./pages/App";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import AuthRoute from "./components/AuthRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      async queryFn({ queryKey: [key] }) {
        if (typeof key !== "string")
          throw new Error(
            `Query key can only be a string, got \`${typeof key}\``
          );

        const res = await axios.get(key);
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
            <AuthRoute exact path="/app" component={App} />
            <AuthRoute
              exact
              path={["/settings", "/settings/peers"]}
              component={Settings}
            />
          </Switch>
        </BrowserRouter>
        <ToastContainer position="bottom-center" theme="dark" />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
