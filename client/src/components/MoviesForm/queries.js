import { gql } from '@apollo/client';

export const fetchDirectorsQuery = gql`
  query directorsQuery($name: String) {
    directors(name: $name) {
      id
      name
    }
  }
`;