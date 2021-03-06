import Button from "@material-ui/core/Button";
import HTTPAccessLogEntryM from "api/models/HTTPAccessLogEntryM";
import { TapFilterContext } from "context/TapFilter";
import useAccessLogsSubscription from "hooks/useAccessLogsSubscription";
import useNamespaces from "hooks/useNamespaces";
import useWorkloads from "hooks/useWorkloads";
import React, { useCallback, useContext, useState } from "react";
import Details from "./components/Details/Details";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import { StyledTap } from "./style";

const Tap = () => {
  const [accessLogForDetails, _setAccessLogForDetails] = useState<HTTPAccessLogEntryM | null>(null);
  const { streaming, namespacesFilter } = useContext(TapFilterContext);

  const { namespaces } = useNamespaces();
  const { workloads } = useWorkloads(namespacesFilter.get);
  const { accessLogs, error, filters, setFilters } = useAccessLogsSubscription();

  const setAccessLogForDetails = useCallback(
    (accessLog: HTTPAccessLogEntryM) => {
      if (accessLog.equals(accessLogForDetails)) {
        _setAccessLogForDetails(null);
      } else {
        _setAccessLogForDetails(accessLog);
      }
    },
    [accessLogForDetails, _setAccessLogForDetails],
  );

  const toggleStreaming = useCallback(() => {
    streaming.set(!streaming.get);
  }, [streaming]);

  return (
    <StyledTap idDetailsShown={!!accessLogForDetails}>
      <div className="filter-container">
        <Filter namespaces={namespaces} workloads={workloads} filters={filters} setFilters={setFilters} />
      </div>
      <div className="button-container">
        <Button variant="contained" color="primary" onClick={toggleStreaming}>
          {streaming.get ? "❚❚" : "▶"}
        </Button>
      </div>
      <div className="table-container">
        <Table accessLogs={accessLogs} setAccessLogForDetails={setAccessLogForDetails} error={error} />
      </div>
      <div className="details-container">
        <Details accessLog={accessLogForDetails} />
      </div>
    </StyledTap>
  );
};

export default Tap;
