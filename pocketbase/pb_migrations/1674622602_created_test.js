migrate((db) => {
  const collection = new Collection({
    "id": "ras2st9fpuks9zf",
    "created": "2023-01-25 04:56:42.768Z",
    "updated": "2023-01-25 04:56:42.768Z",
    "name": "test",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xsitw5k4",
        "name": "field",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ras2st9fpuks9zf");

  return dao.deleteCollection(collection);
})
