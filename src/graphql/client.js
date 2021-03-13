import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from '@apollo/client';
import { GET_QUEUED_SONGS } from './queries';
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
  typeDefs: gql`
    type Song {
      id: ID!
      title: String!
      artist: String!
      thumbnail: String!
      url: String!
      duration: Float!
    }

    input SongInput {
      id: ID!
      title: String!
      artist: String!
      thumbnail: String!
      url: String!
      duration: Float!
    }

    type Query {
      queue: [Song]!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput): [Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONGS
        });

        if (queryResult) {
          const { queue } = queryResult;
          const isInQueue = queue.some((song) => song.id === input.id);
          const newQueue = isInQueue ?
            queue.filter((song) => song.id !== input.id)
            : [...queue, input];

          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: { queue: newQueue },
          });

          return newQueue;
        }
        
        return [];
      },
    },
  },
});

const data = {
  queue: []
};

// For Managing Song Queue in LocalStorage
// Uses typeDefs set on client
client.writeData({ data });

// const client = new ApolloClient({
//   uri: 'https://apollo-music-share-api.herokuapp.com/graphql',
// });

export default client;
