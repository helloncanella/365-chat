import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { split } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8365/graphql",
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({
  uri: "http://localhost:8365/graphql"
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  httpLink
)

export default function setupApollo() {
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  })

  return client
}
