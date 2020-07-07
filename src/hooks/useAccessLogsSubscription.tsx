import { useSubscription } from "@apollo/react-hooks";
import HTTPAccessLogEntryM from "api/models/HTTPAccessLogEntryM";
import { subscribeAccessLogsGQL } from "api/subscribeAccessLogs";
import { useRef, useState } from "react";
import ApolloClients from "utils/ApolloClients";

const useAccessLogsSubscription = () => {
  const [accessLogs, setAccessLogs] = useState<HTTPAccessLogEntryM[]>([]);
  const [filters, setFilters] = useState<AccessLogsInput>({});
  const isStreaming = useRef(false);

  const { error } = useSubscription<HTTPAccessLogs>(subscribeAccessLogsGQL, {
    variables: { input: filters },
    client: ApolloClients.getWssClient(),
    shouldResubscribe: true,
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) console.log(subscriptionData.error);
      if (!subscriptionData.data) return;
      isStreaming.current && setAccessLogs([new HTTPAccessLogEntryM(subscriptionData.data.accessLogs), ...accessLogs]);
    },
  });

  return { accessLogs, error, isStreaming, setFilters };
};
export default useAccessLogsSubscription;
