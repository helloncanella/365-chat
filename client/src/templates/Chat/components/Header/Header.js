import React from "react"
import { compose, pure } from "recompose"
import StatusDot from "../../../../components/StatusDot/StatusDot"

function Header({ receiver } = {}) {
  const { name, isOnline = false } = receiver || {}

  return (
    <div className="header">
      <h3 className="user-name">Simple room</h3>
      {/* <h3 className="user-name">{`@${name}`}</h3> */}
      {/* <StatusDot isOnline={isOnline} /> */}
    </div>
  )
}

export default compose(pure)(Header)
