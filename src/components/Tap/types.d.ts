declare type AccessLogsInput = {
  method?: "GET" | "POST" | "PUT";
};

type RequestEndpoint = {
  name: string;
  namespace: string;
  workload: string;
  serviceAccount: string;
};

type HTTPRequest = {
  method: !String;
  scheme: !String;
  path: !String;
};

type HTTPResponse = {
  statusCode: number;
};

declare type HTTPAccessLogEntry = {
  direction: string;
  source: RequestEndpoint;
  destination: RequestEndpoint;
  protocolVersion: string;
  latency: string;
  request: HTTPRequest;
  response: HTTPResponse;
  startTime: string;
};

declare type HTTPAccessLogs = {
  accessLogs: HTTPAccessLogEntry;
};
