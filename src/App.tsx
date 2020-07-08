import { ApolloProvider } from "@apollo/react-hooks";
import Index from "pages/Index";
import React from "react";
import { createGlobalStyle } from "styled-components";
import ApolloClients from "utils/ApolloClients";

const client = ApolloClients.getHttpsClient();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Index />
      <GlobalStyle />
    </ApolloProvider>
  );
};

const GlobalStyle = createGlobalStyle`
  html {
    font-family: Roboto,Helvetica Neue,sans-serif;
  }

  html,
  body,
  #root {
    height: 100vh;
}
`;

export default App;
