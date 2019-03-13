import React from "react"

export default function FAICon({ icon, className, style }) {
  return (
    <div className={`fa fa-${icon} ${className || ""}`} style={style || {}} />
  )
}
