import React, { Component } from "react"
import "./chat.scss"
import _ from "lodash"

import { Scrollbars } from "react-custom-scrollbars"
import Header from "./components/Header"
import AllMessages from "./components/AllMessages"
import Footer from "./components/Footer"

class Chat extends Component {
  get body() {
    return (
      <Scrollbars className="body">
        <div className="body-content">
          <AllMessages roomId={this.roomId} />
        </div>
      </Scrollbars>
    )
  }

  get roomId() {
    return _.get(this.props, "match.params.roomId")
  }

  render() {
    return (
      <div className="chat">
        <Header roomId={this.roomId} />
        {this.body}
        <Footer roomId={this.roomId} />
      </div>
    )
  }
}

Chat.propTypes = {}

export default Chat
