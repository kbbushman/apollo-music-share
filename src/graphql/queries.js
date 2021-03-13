import { gql } from 'apollo-boost';

// Client decoractor performs query on client, not server
// This query is set on the client in typeDefs

export const GET_QUEUED_SONGS = gql`
  query getQueuedSongs {
    queue @client {
      id
      title
      artist
      thumbnail
      url
      duarion
    }
  }
`;
