import { gql } from 'apollo-boost';

export const GET_SONGS = gql`
  subscription songs {
    songs {
      id
      title
      artist
      thumbnail
      url
      duration
    }
  }
`
