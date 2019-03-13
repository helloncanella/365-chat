import "./registration.scss"

import React, { Component } from "react"
import PropTypes from "prop-types"

class Registration extends Component {
  onSubmit = e => {
    e.preventDefault()
    this.input.value && this.props.registerUser({ name: this.input.value })
  }

  render() {
    return (
      <div className="registration">
        <div className="registration-card">
          <div className="logo">365</div>
          <div className="content">
            <h2>Your name</h2>
            <form onSubmit={this.onSubmit}>
              <input type="text" ref={e => (this.input = e)} />
              <button type="submit" disabled={this.props.isRegistering}>
                {this.props.isRegistering ? "loading..." : "register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Registration

Registration.propTypes = {
  isRegistering: PropTypes.bool,

  /** @param {String} name */
  registerUser: PropTypes.func
}
