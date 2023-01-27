migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sai05vv9v3a6qrb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j1e2a5lh",
    "name": "author",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sai05vv9v3a6qrb")

  // remove
  collection.schema.removeField("j1e2a5lh")

  return dao.saveCollection(collection)
})
