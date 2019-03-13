import { compose, withProps } from "recompose"
import { contacts } from "../templates/Chat/fakeData"

export default compose(
  withProps(props => {
    return { contacts }
  })
)
