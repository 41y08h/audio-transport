import React from "react";
import ReactDOM from "react-dom";
import "./styles/globals.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/Home";
import Add from "./pages/Add";
import axios from "axios";

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
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={Add} />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
