export enum AccessLogsDirection {
  inbound = "inbound",
  outbound = "outbound",
}

class HTTPAccessLogEntryM {
  id: string;
  direction: AccessLogsDirection;
  source: RequestEndpoint;
  destination: RequestEndpoint;
  protocolVersion: string;
  latency: string;
  request: HTTPRequest;
  response: HTTPResponse;

  constructor(httpAccessLogEntry: HTTPAccessLogEntry) {
    this.direction = AccessLogsDirection[httpAccessLogEntry.direction as AccessLogsDirection];
    this.source = httpAccessLogEntry.source;
    this.destination = httpAccessLogEntry.destination;
    this.protocolVersion = httpAccessLogEntry.protocolVersion;
    this.latency = httpAccessLogEntry.latency;
    this.request = httpAccessLogEntry.request;
    this.response = httpAccessLogEntry.response;
    this.id = this.request.id;
  }

  equals(httpAccessLogEntry: HTTPAccessLogEntryM | null) {
    if (!httpAccessLogEntry) {
      return false;
    }
    return this.id === httpAccessLogEntry.id;
  }
}

export default HTTPAccessLogEntryM;
