import { compose, withProps, mapProps } from "recompose"
import { contacts } from "../../fakeData"
import Footer from "./Footer"

export default compose(
  mapProps(props => ({
    receiver: contacts.find(({ id }) => props.roomId === id)
  }))
)(Footer)
