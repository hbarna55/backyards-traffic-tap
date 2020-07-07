class HTTPAccessLogEntryM {
  id: string;
  direction: string;
  source: RequestEndpoint;
  destination: RequestEndpoint;
  protocolVersion: string;
  latency: string;
  request: HTTPRequest;
  response: HTTPResponse;

  constructor(httpAccessLogEntry: HTTPAccessLogEntry) {
    this.direction = httpAccessLogEntry.direction;
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
