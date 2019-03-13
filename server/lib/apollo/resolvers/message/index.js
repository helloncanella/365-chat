import pubSub from "../../pubSub"
import { NEW_MESSAGE } from "../../subscriptions-names"

export const queries = {
  async messages(__, ___, { Collections }) {
    const { Messages } = Collections
    return await Messages.find().toArray()
  }
}

export const mutations = {}

export const subscriptions = {
  newMessage: {
    subscribe: () => pubSub.asyncIterator(NEW_MESSAGE)
  }
}
