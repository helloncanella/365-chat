import { gql } from "apollo-server"

const message = gql`
  type Message {
    _id: String!
    content: String!
    author: User!
    timestamp: Float!
  }

  extend type Query {
    messages: [Message]
  }

  extend type Subscription {
    newMessage: Message
  }
`

export default message
