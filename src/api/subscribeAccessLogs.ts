import gql from "graphql-tag";

export const subscribeAccessLogsGQL = gql`
  subscription accessLogs($input: AccessLogsInput) {
    accessLogs(input: $input) {
      direction
      protocolVersion
      latency
    }
  }
`;
