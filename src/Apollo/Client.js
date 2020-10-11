//import ApolloClient, { InMemoryCache } from "apollo-boost";
import { defaults, resolvers } from "./LocalState";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
//import { setContext } from "";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    withClientState({
      defaults,
      resolvers,
    }),
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    ),
  ]),
  cache,
});
export default client;

/*
export default new ApolloClient({
  uri: "http://localhost:8080",
  cache: new InMemoryCache(),
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});*/
