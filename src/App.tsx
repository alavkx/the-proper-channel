import React from "react";
import {
  NavLink,
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// import { ReactQueryDevtools } from "react-query-devtools";
import { Layout } from "./Layout";
import { TechnologyPage } from "./TechnologyPage";
import { NotFound } from "./NotFound";
import { ErrorFallback } from "./ErrorFallback";
import { inspect } from "@xstate/inspect";
import "@atlaskit/css-reset";
import { Nav } from "./Nav";

inspect({ url: "https://statecharts.io/inspect", iframe: false });

export type RoutePath = `/` | `/not-found` | `/technology/request`;

export const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Router>
      <Nav>
        <NavLink to="/technology" exact>
          Technology
        </NavLink>
        <NavLink to="/something-else">Something Else</NavLink>
      </Nav>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/technology" />
          </Route>
          <Route path="/technology">
            <TechnologyPage />
          </Route>
          <Route path="/not-found">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
    {/* <ReactQueryDevtools initialIsOpen /> */}
  </ErrorBoundary>
);
