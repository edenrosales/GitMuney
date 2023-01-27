migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sai05vv9v3a6qrb")

  collection.listRule = "@request.auth.id = author"
  collection.viewRule = "@request.auth.id = author"
  collection.createRule = "@request.auth.id = author"
  collection.updateRule = "@request.auth.id = author"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sai05vv9v3a6qrb")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
