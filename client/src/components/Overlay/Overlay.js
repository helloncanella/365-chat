import _ from "lodash"
import React, { Component } from "react"
import PropTypes from "prop-types"

/**
 * It wraps the children in overlay. At same time,
 * it should expose a public api with "hide" and "show" methods,
 * responsible for the control of the component's visibility.
 */

class Overlay extends Component {
  constructor() {
    super()
    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
  }

  state = {
    show: false
  }

  hide() {
    this.setState({ show: false })
  }

  show() {
    this.setState({ show: true })
  }

  render() {
    return (
      this.state.show && (
        <div className="overlay-component" onClick={this.hide}>
          <div className="content-card" onClick={e => e.stopPropagation()}>
            {this.props.children}
          </div>
        </div>
      )
    )
  }
}

Overlay.propTypes = {
  children: PropTypes.element
}

export default Overlay
