import _ from "lodash"
import React from "react"
import { compose, mapProps, withProps } from "recompose"
import AllMessages from "./AllMessages"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

const ALL_MESSAGES = gql`
  query AllMessages {
    messages {
      _id
      content
      author {
        _id
        name
        color
      }
      timestamp
    }
  }
`

const NEW_MESSAGE = gql`
  subscription NewMessage {
    newMessage {
      _id
      content
      timestamp
      author {
        _id
        name
        color
      }
    }
  }
`

export default compose(
  graphql(ALL_MESSAGES),
  mapProps(props => {
    const { loading, messages = [] } = props.data || {}

    return {
      messages: messages.map(formatMessage).sort(sortByDate),
      loading
    }
  }),
  graphql(NEW_MESSAGE, { name: "subscription" }),
  withProps(({ subscription, loading, messages }) => {
    const { newMessage } = subscription || {}

    return {
      messages: newMessage
        ? [...messages, formatMessage(newMessage)].sort(sortByDate)
        : messages
    }
  })
)(AllMessages)

const sortByDate = (a, b) =>
  new Date(a.date).getTime() - new Date(b.date).getTime()

function formatMessage(message) {
  const g = key => _.get(message, key)

  return {
    name: g("author.name"),
    date: new Date(g("timestamp")),
    text: g("content"),
    avatar: (
      <div
        style={{
          display: "flex",
          borderRadius: "50%",
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          background: g("author.color")
        }}
      >
        {/* <FAIcon icon="user" style={{ fontSize: "1.5rem", color: "white" }} /> */}
      </div>
    )
  }
}
