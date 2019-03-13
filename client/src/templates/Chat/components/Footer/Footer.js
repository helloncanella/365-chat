import React from "react"

export default function Footer({ receiver }) {
  return (
    <div className="footer">
      <div className="input-container">
        <input type="text" placeholder={`Message`} />
        {/* <input type="text" placeholder={`Message @${receiver.name || ""}`} /> */}
      </div>
    </div>
  )
}
