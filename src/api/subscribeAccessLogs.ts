import gql from "graphql-tag";

export const subscribeAccessLogsGQL = gql`
  subscription accessLogs($input: AccessLogsInput) {
    accessLogs(input: $input) {
      direction
      source {
        name
        namespace
        workload
        serviceAccount
      }
      destination {
        name
        namespace
        workload
        serviceAccount
      }
      protocolVersion
      latency
      request {
        id
        method
        scheme
        path
      }
      response {
        statusCode
      }
    }
  }
`;
