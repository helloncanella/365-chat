import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { split } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import { setContext } from "apollo-link-context"

const isProduction = process.env.NODE_ENV === "production"
const host = isProduction ? "chat-365.herokuapp.com" : "localhost:8365"

const userId = () => localStorage.getItem("loggedUserId") || ""

const wsLink = new WebSocketLink({
  uri: `ws://${host}/graphql`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      authToken: userId()
    })
  }
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: userId()
    }
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
  authLink.concat(httpLink)
)

export default function setupApollo() {
  const client = new ApolloClient({
    link,
    // link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  return client
}
