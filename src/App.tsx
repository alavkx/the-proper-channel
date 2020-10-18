import React from "react";
import {
  Link,
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

inspect({ url: "https://statecharts.io/inspect", iframe: false });

export type RoutePath = `/` | `/not-found` | `/technology/request`;

export const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Router>
      <nav
        css={`
          width: 100%;
          height: 2rem;
        `}
      >
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <Layout>
        <Switch>
          <Route path="/">
            <TechnologyPage />
          </Route>
          <Route path="/technology">
            <Redirect to="/" />
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
