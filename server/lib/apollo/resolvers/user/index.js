import pubSub from "../../pubSub"
import { NEW_MESSAGE } from "../../subscriptions-names"
import { ObjectID } from "mongodb"

export const queries = {
  async loggedUser(__, ___, { Collections: { Users }, loggedUserId } = {}) {
    if (!loggedUserId) return null

    return await Users.findOne({ _id: ObjectID(loggedUserId) })
  }
}

export const mutations = {
  async sendMessage(__, { userId, content, timestamp }, { Collections }) {
    const { Users, Messages } = Collections

    const author = await Users.findOne({ _id: ObjectID(userId) })
    if (!author) throw new Error(`author with id ${userId} doesn't exist`)

    const { insertedId: _id } = await Messages.insertOne({
      content,
      authorId: author._id,
      timestamp
    })

    const newMessage = {
      _id: _id.toString(),
      author: { ...author, _id: author._id.toString() },
      content,
      timestamp
    }

    pubSub.publish(NEW_MESSAGE, {
      newMessage
    })

    return newMessage
  },

  async createUser(__, { name, color }, { Collections }) {
    const newUser = { name, color }

    const { insertedId: _id } = await Collections.Users.insertOne(newUser)

    return { _id, ...newUser }
  }
}

export const subscriptions = {}
