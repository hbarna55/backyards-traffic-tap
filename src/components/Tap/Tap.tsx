import HTTPAccessLogEntryVM from "api/models/HTTPAccessLogEntryVM";
import useAccessLogsSubscription from "hooks/useAccessLogsSubscription";
import useNamespaces from "hooks/useNamespaces";
import useWorkloads from "hooks/useWorkloads";
import React, { useCallback, useState } from "react";
import Details from "./components/Details/Details";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import { StyledTap } from "./style";

const Tap = () => {
  const [accessLogForDetails, _setAccessLogForDetails] = useState<HTTPAccessLogEntryVM | null>(null);

  const { namespaces } = useNamespaces();
  const { workloads } = useWorkloads();
  const { accessLogs, error, isStreaming, setFilters } = useAccessLogsSubscription();

  const setAccessLogForDetails = useCallback(
    (accessLog: HTTPAccessLogEntryVM) => {
      if (accessLog.equals(accessLogForDetails)) {
        _setAccessLogForDetails(null);
      } else {
        _setAccessLogForDetails(accessLog);
      }
    },
    [accessLogForDetails, _setAccessLogForDetails],
  );

  const toggleStreaming = useCallback(() => {
    isStreaming.current = !isStreaming.current;
  }, [isStreaming]);

  return (
    <StyledTap>
      <div className="filter">
        <Filter namespaces={namespaces} workloads={workloads} setFilters={setFilters} />
      </div>
      <div className="button">
        <button onClick={toggleStreaming}>Start</button>
      </div>
      <div className="table">
        <Table accessLogs={accessLogs} setAccessLogForDetails={setAccessLogForDetails} error={error} />
      </div>
      {accessLogForDetails && (
        <div className="details">
          <Details accessLog={accessLogForDetails} />
        </div>
      )}
    </StyledTap>
  );
};

export default Tap;
