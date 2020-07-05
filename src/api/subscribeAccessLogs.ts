import gql from "graphql-tag";

export const subscribeAccessLogsGQL = gql`
  subscription accessLogs($input: AccessLogsInput) {
    accessLogs(input: $input) {
      direction
      startTime
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
