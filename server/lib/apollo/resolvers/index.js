import {
  queries as userQueries,
  subscriptions as userSubscriptions,
  mutations as userMutations
} from "./user"

import {
  queries as messageQueries,
  subscriptions as messageSubscriptions,
  mutations as messageMutations
} from "./message"

const resolvers = {
  Query: {
    ...(messageQueries || {}),
    ...(userQueries || {})
  },
  Subscription: {
    ...(userSubscriptions || {}),
    ...(messageSubscriptions || {})
  },
  Mutation: {
    ...(userMutations || {}),
    ...(messageMutations || {})
  }
}

export default resolvers
