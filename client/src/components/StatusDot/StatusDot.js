import React from "react"
import "./statusDot.scss"

export default function StatusDot({ isOnline }) {
  return <div className={`status-dot ${isOnline ? "online" : "offline"}`} />
}
