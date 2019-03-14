import React from "react"

import PropTypes from "prop-types"

export default class Footer extends React.Component {
  onSubmit = e => {
    e.preventDefault()

    if (!this.input.value) return
    this.props.sendMessage(this.input.value)
    this.input.value = ""
  }

  render() {
    return (
      <div className="footer">
        <form className="input-container" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder={`Message`}
            ref={e => (this.input = e)}
          />
        </form>
      </div>
    )
  }
}

Footer.propTypes = {
  sendMessage: PropTypes.func.isRequired
}
