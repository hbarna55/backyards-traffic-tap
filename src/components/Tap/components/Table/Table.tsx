import HTTPAccessLogEntryVM from "api/models/HTTPAccessLogEntryVM";
import { ApolloError } from "apollo-boost";
import React from "react";

type Props = {
  accessLogs: HTTPAccessLogEntryVM[];
  setAccessLogForDetails: (accessLog: HTTPAccessLogEntryVM) => void;
  error: ApolloError | undefined;
};

const Table = ({ accessLogs, setAccessLogForDetails, error }: Props) => {
  return (
    <div>
      {!error && (
        <div>
          {accessLogs.map((accessLog) => (
            <span key={accessLog.id} onClick={() => setAccessLogForDetails(accessLog)}>
              {accessLog.request.method}
            </span>
          ))}
        </div>
      )}
      {error && <div>error</div>}
    </div>
  );
};

export default Table;
