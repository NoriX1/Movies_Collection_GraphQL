import { gql } from '@apollo/client';

export const directorsQuery = gql`
  query DirectorsQuery {
    directors {
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