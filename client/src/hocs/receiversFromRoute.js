import { withRouter } from "react-router-dom"
import { compose, withProps } from "recompose"
import { contacts } from "../templates/Chat/fakeData"

const findUser = id => contacts.find(user => user.id === id)

export default compose(
  withRouter,
  withProps(props => {
    const { match } = props

    if (!match) return

    return { receivers: [findUser(match.params.id)] }
  })
)
