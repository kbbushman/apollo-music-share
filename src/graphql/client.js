import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  link: new WebSocketLink({
    // uri: 'ws://localhost:4000/graphql',
    uri: 'ws://apollo-music-share-api.herokuapp.com/graphql',
    options: {
      reconnect: true,
    }
  }),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: 'https://apollo-music-share-api.herokuapp.com/graphql',
// });

export default client;
