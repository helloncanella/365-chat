import { MongoClient } from "mongodb"

export default function setupMongoDB({ url, dbName }) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, client) {
      if (err) {
        reject(err)
        return
      }

      const db = client.db(dbName)

      console.log(`Mongodb setup on ${url}`)

      resolve(db)
    })
  })
}
