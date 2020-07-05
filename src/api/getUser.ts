import gql from "graphql-tag";

export const getUserGQL = gql`
  fragment UserFragment on Query {
    user {
      name
      anonymous
      capabilities
      __typename
    }
    __typename
  }

  query user {
    ...UserFragment
  }
`;
