declare type AccessLogsInput = {
  method?: "GET" | "POST" | "PUT";
};

type TCPAddr = {
  ip: string;
  port: number;
};

type RequestEndpoint = {
  name: string;
  namespace: string;
  workload: string;
  serviceAccount: string;
  address: TCPAddr;
};

type HTTPRequest = {
  id: string;
  authority: string;
  method: string;
  scheme: string;
  path: string;
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

type IstioNamespace = {
  namespaces: {
    id: string;
    name: string;
  }[];
};
type IstioWorkload = {
  workloads: {
    id: string;
    name: string;
  }[];
};