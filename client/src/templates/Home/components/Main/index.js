import { compose } from "recompose"
import withContacts from "../../../../hocs/withContacts"
import Main from "./Main"
import { withRouter } from "react-router-dom"

export default compose(
  withRouter,
  withContacts
)(Main)
