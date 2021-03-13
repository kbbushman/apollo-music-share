import { gql } from 'apollo-boost';

export const ADD_OR_REMOVE_FROM_QUEUE = gql`
  mutation addOrRemoveFromQueue($input: SongInput!) {
    addOrRemoveFromQueue(input: $input) @client
  }
`;

export const ADD_SONG = gql`
  mutation addSong($songInput:SongInput!) {
    addSong(songInput:$songInput) {
      id
      title
      artist
      thumbnail
      url
      duration
      created_at
    }
  }
`
