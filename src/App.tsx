import { ApolloProvider } from "@apollo/react-hooks";
import Index from "pages/Index";
import React from "react";
import ApolloClients from "utils/ApolloClients";

const client = ApolloClients.getHttpsClient();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Index />
    </ApolloProvider>
  );
};

export default App;
