import { gql } from '@apollo/client';

export const directorsQuery = gql`
  query DirectorsQuery ($name: String) {
    directors (name: $name) {
      id
      name
      age
      movies {
        id
        name
        genre
      }
    }
  }
`;