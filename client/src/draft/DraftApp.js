import React, { Component } from "react"
import { Mutation, Subscription } from "react-apollo"
import gql from "graphql-tag"
// import  from "graphql-tag"

const ADD_MESSAGE = gql`
  mutation AddMessage($message: String!) {
    addMessage(message: $message) {
      id
      content
    }
  }
`

class DraftApp extends Component {
  render() {
    let input = this.input

    return (
      <div>
        <Mutation mutation={ADD_MESSAGE}>
          {(addMessage, { data, loading }) => {
            return (
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  this.input.value &&
                    addMessage({
                      variables: { message: this.input.value }
                    })
                  this.input.value = ""
                }}
              >
                <input type="text" ref={e => (this.input = e)} />
                <button type="submit">Send</button>
              </form>
            )
          }}
        </Mutation>
        <Subscription
          subscription={gql`
            subscription {
              messageSent {
                id
                content
              }
            }
          `}
        >
          {({ data: { messageSent } = {}, loading }) => (
            <h4>New comment: {!loading && messageSent.content}</h4>
          )}
        </Subscription>
      </div>
    )
    // return div />
  }
}

export default DraftApp
