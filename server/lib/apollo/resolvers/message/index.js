import _ from "lodash"
import pubSub from "../../pubSub"
import { NEW_MESSAGE } from "../../subscriptions-names"
import { withFilter } from "graphql-subscriptions"

export const queries = {
  async messages(__, ___, { Collections }) {
    const { Messages, Users } = Collections

    const result = await Messages.find().toArray()

    return await Promise.all(
      result.map(async r => {
        const authorId = r.authorId
        const author = await Users.findOne({ _id: authorId })
        return { ..._.omit(r, "authorId"), author }
      })
    )
  }
}

export const mutations = {}

export const subscriptions = {
  newMessage: {
    subscribe: withFilter(
      () => pubSub.asyncIterator(NEW_MESSAGE),
      (payload, __, context) => {
        const authorId = _.get(payload, "newMessage.author._id")
        const loggedUserId = _.get(context, "loggedUserId")

        return authorId !== loggedUserId
      }
    )
  }
}
