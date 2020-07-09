import { useSubscription } from "@apollo/react-hooks";
import HTTPAccessLogEntryM from "api/models/HTTPAccessLogEntryM";
import { subscribeAccessLogsGQL } from "api/subscribeAccessLogs";
import { useCallback, useRef, useState } from "react";
import ApolloClients from "utils/ApolloClients";

const useAccessLogsSubscription = () => {
  const [accessLogs, setAccessLogs] = useState<HTTPAccessLogEntryM[]>([]);
  const [filters, _setFilters] = useState<AccessLogsInput>({});
  const isStreaming = useRef(false);

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
      if (subscriptionData.error) console.log(subscriptionData.error);
      if (!subscriptionData.data) return;
      if (isStreaming.current) {
        const newAccessLogs = [new HTTPAccessLogEntryM(subscriptionData.data.accessLogs), ...accessLogs];
        newAccessLogs.length > 50 && newAccessLogs.pop();
        setAccessLogs(newAccessLogs);
      }
    },
  });

  return { accessLogs, error, isStreaming, filters, setFilters };
};
export default useAccessLogsSubscription;
