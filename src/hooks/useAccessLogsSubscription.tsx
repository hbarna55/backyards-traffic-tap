import { useSubscription } from "@apollo/react-hooks";
import HTTPAccessLogEntryM from "api/models/HTTPAccessLogEntryM";
import { subscribeAccessLogsGQL } from "api/subscribeAccessLogs";
import { useRef, useState } from "react";
import ApolloClients from "utils/ApolloClients";

const useAccessLogsSubscription = () => {
  const [accessLogs, setAccessLogs] = useState<HTTPAccessLogEntryM[]>([
    new HTTPAccessLogEntryM({
      direction: "outbound",
      source: {
        name: "frontpage-v1-db8c87ccd-xxzbg",
        namespace: "backyards-demo",
        workload: "frontpage-v1",
        serviceAccount: "default",
      },
      destination: {
        name: "catalog-v1-649f7ff5-kb6kn",
        namespace: "backyards-demo",
        workload: "catalog-v1",
        serviceAccount: "",
      },
      protocolVersion: "HTTP11",
      latency: "197.883425ms",
      request: {
        id: "bf5b3ad4-14d4-47dd-8167-7c551e7c83e6",
        method: "GET",
        scheme: "https",
        path: "/",
      },
      response: { statusCode: 200 },
    } as HTTPAccessLogEntry),
    new HTTPAccessLogEntryM({
      direction: "outbound",
      source: {
        name: "frontpage-v1-db8c87ccd-xxzbg",
        namespace: "backyards-demo",
        workload: "frontpage-v1",
        serviceAccount: "default",
      },
      destination: {
        name: "catalog-v1-649f7ff5-kb6kn",
        namespace: "backyards-demo",
        workload: "catalog-v1",
        serviceAccount: "",
      },
      protocolVersion: "HTTP11",
      latency: "983.751724ms",
      request: {
        id: "ec2a5a25-684b-4978-af81-9fe84ee29195",
        method: "GET",
        scheme: "https",
        path: "/",
      },
      response: { statusCode: 200 },
    } as HTTPAccessLogEntry),
    new HTTPAccessLogEntryM({
      direction: "outbound",
      source: {
        name: "frontpage-v1-db8c87ccd-xxzbg",
        namespace: "backyards-demo",
        workload: "frontpage-v1",
        serviceAccount: "default",
      },
      destination: {
        name: "bookings-v1-6876d75bbb-hd65f",
        namespace: "backyards-demo",
        workload: "bookings-v1",
        serviceAccount: "",
      },
      protocolVersion: "HTTP11",
      latency: "208.920826ms",
      request: {
        id: "bf5b3ad4-14d4-47dd-8167-7c551e7c83e6",
        method: "GET",
        scheme: "https",
        path: "/",
      },
      response: { statusCode: 200 },
    } as HTTPAccessLogEntry),
  ]);
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
