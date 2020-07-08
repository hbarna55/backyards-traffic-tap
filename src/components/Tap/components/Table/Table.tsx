import HTTPAccessLogEntryM from "api/models/HTTPAccessLogEntryM";
import { ApolloError } from "apollo-boost";
import TableComponent from "components/Table/Table";
import { Column } from "components/Table/types";
import React from "react";

type Props = {
  accessLogs: HTTPAccessLogEntryM[];
  setAccessLogForDetails: (accessLog: HTTPAccessLogEntryM) => void;
  error: ApolloError | undefined;
};

const Table = ({ accessLogs, setAccessLogForDetails, error }: Props) => {
  const columns: Array<Column<HTTPAccessLogEntryM>> = React.useMemo(
    () => [
      { Header: "Direction", accessor: (a: HTTPAccessLogEntryM) => a.direction },
      { Header: "Source", accessor: (a: HTTPAccessLogEntryM) => a.source.name },
      { Header: "Destination", accessor: (a: HTTPAccessLogEntryM) => a.destination.name },
      { Header: "Scheme", accessor: (a: HTTPAccessLogEntryM) => a.request.scheme },
      { Header: "Method", accessor: (a: HTTPAccessLogEntryM) => a.request.method },
      { Header: "Path", accessor: (a: HTTPAccessLogEntryM) => a.request.path },
      { Header: "Latency", accessor: (a: HTTPAccessLogEntryM) => a.latency },
      { Header: "HTTP status", accessor: (a: HTTPAccessLogEntryM) => a.response.statusCode },
    ],
    [],
  );

  return (
    <div>
      {!error && (
        <TableComponent columns={columns} data={accessLogs} isLoading={false} rowCallback={setAccessLogForDetails} />
      )}
      {error && <div>error</div>}
      <button onClick={() => setAccessLogForDetails(accessLogs[0])}>button</button>
    </div>
  );
};

export default Table;
