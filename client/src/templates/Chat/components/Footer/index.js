import { compose, withProps, mapProps } from "recompose"
import { contacts } from "../../fakeData"
import Footer from "./Footer"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
// import { gql } from "apollo-server";

const SEND_MESSAGE = gql`
  mutation SendMessage(
    $userId: String!
    $content: String!
    $timestamp: Float!
  ) {
    sendMessage(userId: $userId, content: $content, timestamp: $timestamp) {
      _id
      content
      timestamp
      author {
        _id
        name
      }
    }
  }
`

export default compose(
  graphql(SEND_MESSAGE, {
    props: ({ mutate, data: { error } = {} }) => {
      console.log(error)
      return {
        sendMessage: async message => {
          if (!message) return null
          mutate({
            variables: {
              userId: localStorage.getItem("loggedUserId"),
              content: message,
              timestamp: new Date().getTime()
            }
          })
        }
      }
    }
  })
)(Footer)
