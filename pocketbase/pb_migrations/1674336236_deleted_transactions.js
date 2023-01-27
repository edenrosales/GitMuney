migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("678383o9amhqxtg");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "678383o9amhqxtg",
    "created": "2023-01-14 06:31:27.206Z",
    "updated": "2023-01-14 06:31:27.206Z",
    "name": "transactions",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xd5kdqst",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": 50,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fh3c2by8",
        "name": "amount",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "iwpphqok",
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
        "id": "w6pxbqys",
        "name": "category",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": 0,
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
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": [],
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": [],
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
})
