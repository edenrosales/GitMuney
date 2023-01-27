migrate((db) => {
  const collection = new Collection({
    "id": "sai05vv9v3a6qrb",
    "created": "2023-01-21 21:24:43.379Z",
    "updated": "2023-01-21 21:24:43.379Z",
    "name": "transactions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tjvaelx4",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "r4r9yxta",
        "name": "amount",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "zgt1ijql",
        "name": "date",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "ffbb5rj6",
        "name": "category",
        "type": "text",
        "required": true,
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
  const collection = dao.findCollectionByNameOrId("sai05vv9v3a6qrb");

  return dao.deleteCollection(collection);
})
