import React from "react"
import Chat from "templates/Chat/Chat.js"
import ScreenCentered from "../../../components/ScreenCentered/ScreenCentered"

export default [
  {
    path: "/chat-list",
    exact: true,
    icon: "comment",
    name: "Chat",
    render: () => (
      <ScreenCentered>
        <h1 style={{ color: "gray", fontSize: "5rem" }}>Chat list</h1>
      </ScreenCentered>
    )
  },
  {
    path: "/partner",
    icon: "users",
    name: "Partner",
    render: () => (
      <ScreenCentered>
        <h1 style={{ color: "gray", fontSize: "5rem" }}>Partner</h1>
      </ScreenCentered>
    )
  },
  {
    path: "/document",
    icon: "file-text",
    name: "Document",
    render: () => (
      <ScreenCentered>
        <h1 style={{ color: "gray", fontSize: "5rem" }}>Document</h1>
      </ScreenCentered>
    )
  },
  {
    from: "/",
    redirect: "/chat-list",
    exact: true
  }
]
