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
        address {
          ip
          port
        }
      }
      destination {
        name
        namespace
        workload
        serviceAccount
        address {
          ip
          port
        }
      }
      protocolVersion
      latency
      request {
        id
        authority
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
