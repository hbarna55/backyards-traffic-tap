import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
// import { split } from "apollo-link"
// import { HttpLink } from "apollo-link-http"
// import { WebSocketLink } from "apollo-link-ws"
// import { getMainDefinition } from "apollo-utilities"
import { Hello } from "components/Hello"
import React from "react"

const client = new ApolloClient({
  uri: "/api/graphql",
})

// Create an http link:
// const httpLink = new HttpLink({
//   uri: "https://local.backyards.hu:55444/api/graphql",
// })

// Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: `wss://local.backyards.hu:55444/api/graphql`,
//   options: {
//     reconnect: true,
//   },
// })

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return definition.kind === "OperationDefinition" //&& definition.operation === "subscription"
//   },
//   // wsLink,
//   httpLink,
// )

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Hello hello="hello" world="world" />
    </ApolloProvider>
  )
}

export default App
