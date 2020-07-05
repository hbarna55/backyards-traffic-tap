import gql from "graphql-tag";

export const getWorkloadsGQL = gql`
  fragment SidecarFragment on Sidecar {
    name
    namespace
    spec {
      workloadSelector {
        labels
        __typename
      }
    }
  }

  fragment WorkloadFragment on IstioWorkload {
    id
    namespace
    name
    sidecars {
      ...SidecarFragment
      __typename
    }
    __typename
  }

  query workloads($namespaces: [String!]) {
    workloads(namespaces: $namespaces) {
      ...WorkloadFragment
    }
  }
`;
