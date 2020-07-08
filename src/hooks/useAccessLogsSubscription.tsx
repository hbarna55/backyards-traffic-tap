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
        name: "backyards-68ddc65b4-bbvvk",
        namespace: "backyards-system",
        workload: "backyards",
        serviceAccount: "backyards",
        address: { ip: "10.244.0.12", port: 37760 },
      },
      destination: {
        name: "backyards-prometheus-6cb5fb77d4-pktdx",
        namespace: "backyards-system",
        workload: "backyards-prometheus",
        serviceAccount: "",
        address: { ip: "10.104.208.79", port: 59090 },
      },
      protocolVersion: "HTTP11",
      latency: "51.837545ms",
      request: {
        id: "08e0bf1c-4a9d-4fb9-81ab-2faba1326752",
        authority: "backyards-prometheus:59090",
        method: "POST",
        scheme: "https",
        path: "/prometheus/api/v1/query",
      },
      response: { statusCode: 200 },
    } as HTTPAccessLogEntry),
    new HTTPAccessLogEntryM({
      direction: "inbound",
      source: {
        name: "backyards-68ddc65b4-bbvvk",
        namespace: "backyards-system",
        workload: "backyards",
        serviceAccount: "",
        address: { ip: "10.244.0.12", port: 56506 },
      },
      destination: {
        name: "backyards-prometheus-6cb5fb77d4-pktdx",
        namespace: "backyards-system",
        workload: "backyards-prometheus",
        serviceAccount: "backyards-prometheus",
        address: { ip: "10.244.0.16", port: 9090 },
      },
      protocolVersion: "HTTP11",
      latency: "33.182829ms",
      request: {
        id: "c585da48-fd3d-4862-ab24-731323a81d6b",
        authority: "backyards-prometheus:59090",
        method: "POST",
        scheme: "http",
        path: "/prometheus/api/v1/query",
      },
      response: { statusCode: 200 },
    } as HTTPAccessLogEntry),
    new HTTPAccessLogEntryM({
      direction: "outbound",
      source: {
        name: "backyards-68ddc65b4-bbvvk",
        namespace: "backyards-system",
        workload: "backyards",
        serviceAccount: "backyards",
        address: { ip: "10.244.0.12", port: 37666 },
      },
      destination: {
        name: "backyards-prometheus-6cb5fb77d4-pktdx",
        namespace: "backyards-system",
        workload: "backyards-prometheus",
        serviceAccount: "",
        address: { ip: "10.104.208.79", port: 59090 },
      },
      protocolVersion: "HTTP11",
      latency: "48.557342ms",
      request: {
        id: "31b02de7-561a-4c9f-8d33-e210918341ea",
        authority: "backyards-prometheus:59090",
        method: "POST",
        scheme: "https",
        path: "/prometheus/api/v1/query",
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
