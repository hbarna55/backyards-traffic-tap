import { ApolloConsumer, useSubscription } from "@apollo/react-hooks";
import { subscribeAccessLogsGQL } from "api/subscribeAccessLogs";
import React, { useState } from "react";
import ApolloClients from "utils/ApolloClients";

export interface HelloProps {
  hello: string;
  world: string;
}

const TodoPublicListSubscription = () => {
  const [l, setL] = useState("POST");

  const { loading, error, data } = useSubscription(subscribeAccessLogsGQL, {
    variables: { input: { method: l } },
    client: ApolloClients.getWssClient(),
    shouldResubscribe: true,
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) console.log(subscriptionData.error); // never called
      if (!subscriptionData.data) return;
      console.log(subscriptionData.data);
    },
  });
  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>Error</span>;
  }
  return (
    <div>
      <div>{data ? JSON.stringify(data) : null}</div>
      <button onClick={() => setL("GET")}>ba</button>
    </div>
  );
};

export const Hello = (props: HelloProps) => {
  return (
    <ApolloConsumer>
      {(client) => (
        <h1>
          Hello from {props.hello} and {props.world}!
          <TodoPublicListSubscription />
          {console.log(client)}
        </h1>
      )}
    </ApolloConsumer>
  );
};
