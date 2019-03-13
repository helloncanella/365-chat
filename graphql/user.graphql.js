import { gql } from "apollo-server"

const user = gql`
  type User {
    _id: String!
    name: String!
    color: String!
  }

  extend type Mutation {
    startTyping(userId: String!): Boolean
    stopTyping(userId: String!): Boolean
    sendMessage(userId: String!, content: String!, timestamp: Float!): Message!
    createUser(name: String!, color: String!): User!
  }

  extend type Subscription {
    isUserTyping(userId: String!): Boolean
  }
`

export default user
