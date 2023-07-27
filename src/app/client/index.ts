import { ApolloClient, InMemoryCache, ApolloProvider, gql, ApolloClientOptions, NormalizedCacheObject } from '@apollo/client';

export const DEFAULT_CLIENT_OPTIONS: Omit<ApolloClientOptions<NormalizedCacheObject>, 'cache'> = {
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
}
export const CLIENTS = {
  BifrostKusama: new ApolloClient({
    ...DEFAULT_CLIENT_OPTIONS,
    uri: 'https://squid.subsquid.io/zenlink-bifrost-kusama-squid/graphql',
    cache: new InMemoryCache(),
  }),
  BifrostPolkadot: new ApolloClient({
    ...DEFAULT_CLIENT_OPTIONS,
    uri: 'https://squid.subsquid.io/zenlink-bifrost-polkadot-squid/graphql',
    cache: new InMemoryCache(),
  }),
}