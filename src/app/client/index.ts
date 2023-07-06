import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
export const CLIENTS = {
  BifrostKusama: new ApolloClient({
    uri: 'https://squid.subsquid.io/zenlink-bifrost-kusama-squid/graphql',
    cache: new InMemoryCache(),
  }),
  BifrostPolkadot: new ApolloClient({
    uri: 'https://squid.subsquid.io/zenlink-bifrost-polkadot-squid/graphql',
    cache: new InMemoryCache(),
  }),
}