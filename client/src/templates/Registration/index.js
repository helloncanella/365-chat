import { compose, withHandlers, withState } from "recompose"
import Registration from "./Registration"
import { withRouter } from "react-router-dom"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import _ from "lodash"

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $color: String!) {
    createUser(name: $name, color: $color) {
      _id
    }
  }
`

const randomColor = () => {
  const colors = ["purple", "blue", "red", "orange", "green", "indigo"]
  return colors[_.random(0, colors.length - 1)]
}

export default compose(
  withRouter,
  withState("isRegistering", "setLoadingState", false),
  graphql(CREATE_USER, {
    props: ({ mutate }) => {
      return {
        createUser: async ({ name } = {}) => {
          const result = await mutate({
            variables: { name, color: randomColor() }
          })
          return _.get(result, "data.createUser")
        }
      }
    }
  }),

  withHandlers({
    registerUser: props => async ({ name }) => {
      if (!name) return
      props.setLoadingState(true)
      const newUser = await props.createUser({ name })
      localStorage.setItem("loggedUserId", newUser._id)
      props.setLoadingState(false)
      props.history.push("/")
    }
  })
)(Registration)
