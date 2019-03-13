const http = require("http")
const { ApolloServer } = require("apollo-server-express")
const express = require("express")

import typeDefs from "./server/graphql/index"
import resolvers from "./server/lib/apollo/resolvers/index"
import setupMongoDB from "./server/lib/apollo/setupMongoDB"

setupMongoDB({ url: "mongodb://localhost:27017", dbName: "chat-graphql" })
  .then(database => {
    const PORT = process.env.DEV_PORT
    const app = express()

    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req, connection }) => {
        return {
          Collections: {
            Messages: database.collection("messages"),
            Users: database.collection("users")
          }
        }
      }
    })

    apollo.applyMiddleware({ app })

    //TODO: add https on production
    const httpServer = http.createServer(app)

    //adding websocket
    apollo.installSubscriptionHandlers(httpServer)

    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
      )
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${
          apollo.subscriptionsPath
        }`
      )
    })
  })
  .catch(error => {
    console.error(error)
  })
