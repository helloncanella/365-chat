import pubSub from "../../pubSub"
import { NEW_MESSAGE } from "../../subscriptions-names"
import { ObjectID } from "mongodb"

export const queries = {}

export const mutations = {
  async sendMessage(__, { userId, content, timestamp }, { Collections }) {
    const { Users, Messages } = Collections

    const author = await Users.findOne({ _id: ObjectID(userId) })
    if (!author) throw new Error(`author with id ${userId} doesn't exist`)

    const message = {
      author,
      content,
      timestamp
    }

    const { insertedId: _id } = await Messages.insertOne(message)
    const newMessage = { _id, ...message }
    pubSub.publish(NEW_MESSAGE, { newMessage })

    return newMessage
  },

  async createUser(__, { name, color }, { Collections }) {
    const newUser = { name, color }

    const { insertedId: _id } = await Collections.Users.insertOne(newUser)

    return { _id, ...newUser }
  }
}

export const subscriptions = {}
