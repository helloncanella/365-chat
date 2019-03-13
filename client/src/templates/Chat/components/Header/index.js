import { compose, withProps } from "recompose"
import receiversFromRoute from "hocs/receiversFromRoute"
import Header from "./Header"
import { contacts } from "../../fakeData"

export default compose(
  withProps(props => ({
    receiver: contacts.find(({ id }) => id === props.roomId)
  }))
)(Header)
