import { Route, Switch, Redirect } from "react-router-dom"
import React, { Component } from "react"
import Registration from "templates/Registration"
import Home from "templates/Home/Home.js"
import NoMatch from "../NoMatch/NoMatch"

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route component={Registration} path="/registration" exact />
          <Route
            path="/"
            render={() => {
              if (!localStorage.getItem("loggedUserId"))
                return <Redirect to="/registration" />
              return <Home />
            }}
          />
        </Switch>
      </div>
    )
  }
}

export default App
