import { gql } from 'apollo-boost';

export const GET_SONGS = gql`
  subscription getSongs {
    songs(order_by: {created_at: desc}) {
      artist
      id
      title
      thumbnail
      url
      duration
    }
  }
`
