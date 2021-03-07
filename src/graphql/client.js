import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://apollo-music-api-v2.hasura.app/v1/graphql',
});

export default client;
