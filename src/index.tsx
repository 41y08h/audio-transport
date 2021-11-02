import React from "react";
import ReactDOM from "react-dom";
import "./styles/globals.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import axios from "axios";

import Home from "./pages/Home";
import App from "./pages/App";
import Login from "./pages/Login";

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
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
