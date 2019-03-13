import typeDefs from "../../graphql"
import resolvers from "./resolvers"
import http from "http"

const { ApolloServer } = require("apollo-server-express")

export default function setupApollo({ app, path = "/graphql", db = {} } = {}) {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }) => {
      return {
        db
      }
      // if (connection) {
      //   console.log("tico")
      // } else {
      //   console.log("req", req.headers, req.body)
      // }
    }
  })

  apollo.applyMiddleware({ app, path })

  const server = http.createServer(app)
  apollo.installSubscriptionHandlers(server)

  app.use(path, (req, res) => {
    if (req.method === "GET") {
      res.end()
    }
  })

  return apollo
}
