import React from "react"
import "./menuItem.scss"
import { NavLink } from "react-router-dom"

export default function MenuItem({
  name,
  icon = null,
  rightComponent = null,
  className,
  path,
  style
} = {}) {
  return (
    <NavLink
      className={`menu-item ${className || ""}`}
      activeClassName="selected"
      style={{ ...(style || {}) }}
      to={path}
    >
      <div className="content">
        {icon && <div className="icon-container">{icon}</div>}
        <div className="name">{name}</div>
      </div>
      {rightComponent}
    </NavLink>
  )
}
