import { gql } from '@apollo/client';

export const moviesQuery = gql`
  query MoviesQuery {
    movies {
      id
      name
      genre
      watched
      rate
      director {
        id
        name
      }
    }
  }
`;