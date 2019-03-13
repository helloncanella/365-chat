import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { split } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"

const isProduction = process.env.NODE_ENV === "production"
const host = isProduction ? "chat-365.heroku.com" : "localhost:8365"

const wsLink = new WebSocketLink({
  uri: `ws://${host}/graphql`,
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({
  uri: `http://${host}/graphql`
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
