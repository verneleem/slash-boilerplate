import history from './history';

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  InMemoryCacheConfig,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GetIdTokenClaimsOptions, IdToken } from '@auth0/auth0-react';

function createApolloClient(
  getIdTokenClaims:
    | ((options?: GetIdTokenClaimsOptions | undefined) => Promise<IdToken>)
    | null,
) {
  /**
   * TODO: Copy the .env.example file to .env and update the variables to your Slash GraphQL endpoint.
   * For information on setting up Slash and obtaining your GraphQL endpoint see: https://dgraph.io/graphql
   */
  const GRAPHQL_ENDPOINT = process.env.REACT_APP_SLASH_GRAPHQL_ENDPOINT;
  const AUTH_HEADER = process.env.REACT_APP_SLASH_AUTH_HEADER;

  const inMemoryCacheConfig: InMemoryCacheConfig = {
    typePolicies: {
      /**
       * TODO: map any custom id fields here for your GraphQL types to auto update cache.
       * For more information see: https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields
       */
      User: {
        keyFields: ['username'],
      },
    },
  };

  if (getIdTokenClaims == null) {
    return new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      cache: new InMemoryCache(inMemoryCacheConfig),
    });
  }

  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  /**
   * TODO: Add support for subscriptions with wsLink and splitLink.
   * For more information see: https://www.apollographql.com/docs/react/data/subscriptions/#setting-up-the-transport
   */

  const authLink = setContext(async (request, { headers }) => {
    const idTokenClaims = await getIdTokenClaims();
    if (AUTH_HEADER && idTokenClaims.__raw)
      return {
        headers: {
          ...headers,
          [AUTH_HEADER]: idTokenClaims.__raw,
        },
      };
    return {
      headers,
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(inMemoryCacheConfig),
  });
}

export default createApolloClient;

export function onRedirectCallback(appState: any) {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
}
