import { join } from "path"
import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import sectionsRoutes from "../../routes/sections.routes"
import NoMatch from "../../../NoMatch/NoMatch"
import Chat from "../../../Chat/Chat"

export default function Main({ contacts = [], match } = {}) {
  return (
    <main>
      <Switch>
        {sectionsRoutes.map(
          ({ component, render, path, redirect, exact, from } = {}, index) => {
            const basicProps = { exact, key: `section-route-${index}` }
            if (redirect)
              return <Redirect {...basicProps} from={from} to={redirect} />

            if (!path) return null
            return (
              <Route
                {...basicProps}
                render={render}
                component={component}
                path={join(match.url, path)}
                key={`section-menu-item-${index}`}
              />
            )
          }
        )}

        {/* All contact's rooms */}
        <Route
          path={`/chat/:roomId(${contacts.map(c => c.id).join("|")})`}
          component={Chat}
        />

        <Route component={NoMatch} />
      </Switch>
    </main>
  )
}
