import { gql } from '@apollo/client';

export const fetchDirectorsQuery = gql`
  query directorsQuery {
    directors {
      id
      name
    }
  }
`;