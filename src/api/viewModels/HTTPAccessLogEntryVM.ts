class HTTPAccessLogEntryVM {
  id: string;
  direction: string;
  source: RequestEndpoint;
  destination: RequestEndpoint;
  protocolVersion: string;
  latency: string;
  request: HTTPRequest;
  response: HTTPResponse;
  startTime: Date;

  constructor(httpAccessLogEntry: HTTPAccessLogEntry) {
    this.direction = httpAccessLogEntry.direction;
    this.source = httpAccessLogEntry.source;
    this.destination = httpAccessLogEntry.destination;
    this.protocolVersion = httpAccessLogEntry.protocolVersion;
    this.latency = httpAccessLogEntry.latency;
    this.request = httpAccessLogEntry.request;
    this.response = httpAccessLogEntry.response;
    this.startTime = new Date(httpAccessLogEntry.startTime);
    this.id = this.startTime.getTime() + this.latency;
  }
  equals(httpAccessLogEntry: HTTPAccessLogEntryVM | null) {
    if (!httpAccessLogEntry) {
      return false;
    }
    return this.id === httpAccessLogEntry.id;
  }
}

export default HTTPAccessLogEntryVM;
