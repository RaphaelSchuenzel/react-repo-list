import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.GITHUB_KEY}`
  },
  cache: new InMemoryCache()
});

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  </React.StrictMode>
);
