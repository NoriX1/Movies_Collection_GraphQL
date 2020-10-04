import { gql } from '@apollo/client';

export const moviesQuery = gql`
  query MoviesQuery ($name: String) {
    movies (name: $name){
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