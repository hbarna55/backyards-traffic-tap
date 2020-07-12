import { useSubscription } from "@apollo/react-hooks";
import HTTPAccessLogEntryM from "api/models/HTTPAccessLogEntryM";
import { subscribeAccessLogsGQL } from "api/subscribeAccessLogs";
import { TapFilterContext } from "context/TapFilter";
import { useCallback, useContext, useState } from "react";
import ApolloClients from "utils/ApolloClients";

const useAccessLogsSubscription = () => {
  const { streaming } = useContext(TapFilterContext);
  const [accessLogs, setAccessLogs] = useState<HTTPAccessLogEntryM[]>([]);
  const [filters, _setFilters] = useState<AccessLogsInput>({});

  const setFilters = useCallback(
    (accessLogsInput: AccessLogsInput) => {
      setAccessLogs([]);
      _setFilters(accessLogsInput);
    },
    [_setFilters],
  );

  const { error } = useSubscription<HTTPAccessLogs>(subscribeAccessLogsGQL, {
    variables: { input: filters },
    client: ApolloClients.getWssClient(),
    shouldResubscribe: true,
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;
      if (streaming.get) {
        const newAccessLogs = [new HTTPAccessLogEntryM(subscriptionData.data.accessLogs), ...accessLogs];
        newAccessLogs.length > 50 && newAccessLogs.pop();
        setAccessLogs(newAccessLogs);
      }
    },
  });

  return { accessLogs, error, filters, setFilters };
};
export default useAccessLogsSubscription;
