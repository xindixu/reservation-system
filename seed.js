import { Seeder } from "mongo-seeding"
import path from "path"

process.env.DEBUG = "mongo-seeding"

const config = {
  database: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@reservation-system.bqumh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  dropCollections: true,
}
const seeder = new Seeder(config)

const collectionReadingOptions = {
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
}

const collections = seeder.readCollectionsFromPath(path.resolve("./data"), collectionReadingOptions)

seeder
  .import(collections)
  .then(() => {
    console.log(collections)
    // Do whatever you want after successful import
  })
  .catch((err) => {
    console.log(err)
    // Handle errors
  })
