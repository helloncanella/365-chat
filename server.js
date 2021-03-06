const http = require("http")
const { ApolloServer } = require("apollo-server-express")
const express = require("express")

import typeDefs from "./graphql/index"
import resolvers from "./server/lib/apollo/resolvers/index"
import setupMongoDB from "./server/lib/apollo/setupMongoDB"
import path from "path"

const isProduction = process.env.NODE_ENV === "production"

const database = isProduction ? "heroku_crwpjkjk" : "chat-service"
const url = isProduction
  ? `mongodb://dbAdmin:CaE522FptiJhkLz@ds135519.mlab.com:35519/${database}`
  : "mongodb://127.0.0.1:27017"

import _ from "lodash"

setupMongoDB({ url, dbName: database })
  .then(database => {
    const PORT = process.env.PORT || process.env.DEV_PORT || 8365
    const app = express()

    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: {
        endpoint: "/graphql"
      },
      context: async ({ req, connection }) => {
        return {
          loggedUserId:
            _.get(req, "headers.authorization") ||
            _.get(connection, "context.authToken"),
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

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "./client/build")))

      app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./client/build", "index.html"))
      })
    }

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
