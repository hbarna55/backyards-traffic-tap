import { ApolloProvider } from "@apollo/react-hooks";
import Index from "pages/Index";
import React from "react";
import ApolloClients from "utils/ApolloClients";
import { GlobalStyle } from "./style";

const client = ApolloClients.getHttpsClient();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Index />
      <GlobalStyle />
    </ApolloProvider>
  );
};

export default App;
