import React from "react"
import { compose, pure } from "recompose"
import moment from "moment"

function Message({ name, avatar, text, date } = {}) {
  return (
    <div className="message">
      {avatar && <div className="avatar-column">{avatar}</div>}
      <div className="message-column">
        <div className="meta-header">
          <span className="name">{name}</span>{" "}
          <span className="date">{moment(date).format("DD/MM/YYYY")}</span>
        </div>
        <div className="message-body">
          {text.split("\n").map((paragraph, index) => (
            <p key={`message-timestamp-${new Date(date).getTime()}-${index}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default compose(pure)(Message)
