const { MongoClient, objectID } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "to-do-list";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("lists");

  // code goes here
  // const insertResult = await collection.insertMany([
  //   {
  //     listName: "groceries",
  //     list: [
  //       { task: "tomatos", complete: "task-complete", checked: true },
  //       { task: "bacon", complete: "task-complete", checked: true },
  //       { task: "mushrooms", complete: "task-complete", checked: true },
  //     ],
  //   },
  //   {
  //     listName: "Supplies",
  //     list: [
  //       { task: "rope", complete: "task-complete", checked: true },
  //       { task: "duct tape", complete: "task-complete", checked: true },
  //       { task: "shovel", complete: "task-complete", checked: true },
  //     ],
  //   },
  // ]);

  // return insertResult;

  const findResults = await collection.findOne({
    _id: new objectID("620f444f2e704ff3faeb8bc9"),
  });

  return findResults;
}

main()
  .then((result) => console.log("result", result))
  .catch((error) => console.error(error))
  .finally(() => {
    console.log("done.");
    client.close();
  });
