import { ApolloConsumer, useSubscription } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import { WebSocketLink } from "apollo-link-ws"
import gql from "graphql-tag"
import React, { useState } from "react"
// import { SubscriptionClient } from "subscriptions-transport-ws"

export interface HelloProps {
  hello: string
  world: string
}

// const QUERY = gql`
//   fragment RequestEndpointFragment on RequestEndpoint {
//     namespace
//     name
//     workload
//     metadata
//     address {
//       ip
//       port
//     }
//   }
//   subscription accessLogs($input: AccessLogsInput) {
//     accessLogs(input: $input) {
//       direction
//       protocolVersion
//       latency
//       source {
//         ...RequestEndpointFragment
//       }
//       destination {
//         ...RequestEndpointFragment
//       }
//       request {
//         userAgent
//         referer
//         originalPath
//         authority
//         method
//         scheme
//         path
//         headers
//         metadata
//       }
//       response {
//         statusCode
//         flags
//         bodyBytes
//         metadata
//         headers
//       }
//       protocolVersion
//       authInfo {
//         requestPrincipal
//         principal
//         namespace
//         user
//       }
//     }
//   }
// `
const QUERY2 = gql`
  subscription accessLogs($input: AccessLogsInput) {
    accessLogs(input: $input) {
      direction
      protocolVersion
      latency
    }
  }
`

// const client = new ApolloClient<object>({
//   uri: "wss://local.backyards.hu:55444/api/graphql",
// })

// Create WebSocket client
// const WSClient = new SubscriptionClient(`wss://local.backyards.hu:55444/api/graphql`, {
//   reconnect: true,
// })

const wsLink = new WebSocketLink({
  uri: `wss://local.backyards.hu:55444/api/graphql`,
  options: {
    reconnect: true,
  },
})

const GraphQLClient = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
})

const TodoPublicListSubscription = () => {
  const [isRun, setRun] = useState(true)
  const { loading, error, data } = useSubscription(QUERY2, {
    variables: { input: {} },
    client: GraphQLClient,
    shouldResubscribe: isRun,
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.error) console.log(subscriptionData.error) // never called
      if (!subscriptionData.data) return
      console.log(subscriptionData.data)
    },
  })
  // setRun(false)
  if (loading) {
    return <span>Loading...</span>
  }
  if (error) {
    return <span>Error</span>
  }
  return (
    <div>
      {isRun.toString()}
      <button onClick={() => setRun(false)}>st</button>
      {data ? JSON.stringify(data) : null}
    </div>
  )
}

export const Hello = (props: HelloProps) => {
  // fetch("wss://local.backyards.hu:55444/api/graphql", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     query: QUERY2,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((res) => console.log(res.data))

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
  )
}
