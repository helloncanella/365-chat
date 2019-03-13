import React from "react"
export default function ScreenCentered({ children }) {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
  return (
    <div className="screen-centered" style={style}>
      {children}
    </div>
  )
}
