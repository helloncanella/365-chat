import React, { Component } from "react"
import "./home.scss"
import FAICon from "components/FAIcon/FAIcon"
import MenuItem from "../../components/MenuItem/MenuItem"
import sectionsRoutes from "./routes/sections.routes"
import { join } from "path"
import { contacts } from "../Chat/fakeData"
import Main from "./components/Main"
import StatusDot from "../../components/StatusDot/StatusDot"

class Home extends Component {
  get sectionsMenu() {
    return (
      <ul className="sections-menu">
        {sectionsRoutes
          .filter(a => !a.redirect)
          .map(({ path, icon, name } = {}, index) => {
            return (
              <li key={`section-menu-item-${index}`}>
                <MenuItem
                  path={path}
                  name={name}
                  selected={false}
                  icon={<FAICon className="icon" icon={icon} />}
                />
              </li>
            )
          })}
      </ul>
    )
  }

  get favoriteContacts() {
    return (
      <div className="favorite-contacts">
        <h5 className="title">Favorite Contacts</h5>
        <ul className="contacts">
          {contacts.map(
            ({ link, icon, name, color, id, isOnline } = {}, index) => {
              return (
                <li key={`contact-${index}`}>
                  <MenuItem
                    name={name}
                    path={join("/chat", id)}
                    icon={
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          background: color,
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {/* <FAICon icon="user" style={{ color: "white" }} /> */}
                      </div>
                    }
                    // rightComponent={<StatusDot isOnline={isOnline} />}
                  />
                </li>
              )
            }
          )}
        </ul>
      </div>
    )
  }

  get secondMenu() {
    return (
      <div className="second-menu">
        {this.sectionsMenu}
        {this.favoriteContacts}
      </div>
    )
  }

  render() {
    return (
      <div className="home">
        <div className="first-menu">
          <img src="/images/365-logo.png" alt="logo" />
        </div>
        <div className="wrap">
          <div className="notifications" />
          {this.secondMenu}
          <Main />
        </div>
      </div>
    )
  }
}

export default Home
