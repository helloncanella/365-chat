import message from "./message.graphql"
import user from "./user.graphql"
import { gql } from "apollo-server"

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  ${user}
  ${message}
`

export default typeDefs
