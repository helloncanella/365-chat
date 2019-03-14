import { compose, withProps, mapProps } from "recompose"
import { contacts } from "../../fakeData"
import Footer from "./Footer"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { ALL_MESSAGES } from "../AllMessages"

const LOGGED_USER = gql`
  query LoggedUser {
    loggedUser {
      _id
      name
    }
  }
`
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
  graphql(LOGGED_USER, {
    props: ({ data = {} }) => {
      return { loggedUser: data.loggedUser }
    }
  }),
  graphql(SEND_MESSAGE, {
    props: ({ mutate, ownProps: { loggedUser = {} } = {} }) => {
      return {
        sendMessage: async message => {
          if (!message) return null

          const timestamp = new Date().getTime()

          mutate({
            variables: {
              userId: loggedUser._id,
              content: message,
              timestamp
            },

            optimisticResponse: {
              sendMessage: {
                _id: Math.random() * -1,
                __typename: "Message",
                content: message,
                author: loggedUser,
                timestamp
              }
            }
          })
        }
      }
    },

    options: {
      update: (cache, { data: { sendMessage } }) => {
        const query = ALL_MESSAGES
        const data = cache.readQuery({ query })

        console.log(data.messages)
        data.messages.push(sendMessage)
        cache.writeQuery({ query, data })
      }
    }
  })
)(Footer)
