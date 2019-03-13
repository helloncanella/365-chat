import React, { Component } from "react"
import { compose, pure } from "recompose"
import Message from "./components/Message/Message"

function AllMessages(props) {
  return (
    <ul className="all-messages messages">
      {(props.messages || []).map((message, index) => {
        return (
          <li className="message-container" key={`message-${index}`}>
            <Message {...message} />
          </li>
        )
      })}
    </ul>
  )
}

export default compose(pure)(AllMessages)
