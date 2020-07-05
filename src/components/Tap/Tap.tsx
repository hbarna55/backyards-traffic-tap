import { useSubscription } from "@apollo/react-hooks";
import { subscribeAccessLogsGQL } from "api/subscribeAccessLogs";
import React, { useCallback, useRef, useState } from "react";
import ApolloClients from "utils/ApolloClients";
import Details from "./components/Details/Details";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import { StyledTap } from "./style";
import HTTPAccessLogEntryVM from "./viewModels/HTTPAccessLogEntryVM";

const Tap = () => {
  const [accessLogs, setAccessLogs] = useState<HTTPAccessLogEntryVM[]>([]);
  const [accessLogForDetails, _setAccessLogForDetails] = useState<HTTPAccessLogEntryVM | null>(null);
  const [filters, setFilters] = useState<AccessLogsInput>({});
  const isStreaming = useRef(false);

  const { error } = useSubscription<HTTPAccessLogs>(subscribeAccessLogsGQL, {
    variables: { input: filters },
    client: ApolloClients.getWssClient(),
    shouldResubscribe: true,
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) console.log(subscriptionData.error);
      if (!subscriptionData.data) return;
      isStreaming.current && setAccessLogs([new HTTPAccessLogEntryVM(subscriptionData.data.accessLogs), ...accessLogs]);
    },
  });

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
        <Filter setFilters={setFilters} />
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
