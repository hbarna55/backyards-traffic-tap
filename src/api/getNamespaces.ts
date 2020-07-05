import gql from "graphql-tag";

export const getNamespacesGQL = gql`
  query namespaces {
    namespaces {
      id
      name
    }
  }
`;
