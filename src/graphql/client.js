import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://apollo-music-database.herokuapp.com/v1/graphql',
});

export default client;
