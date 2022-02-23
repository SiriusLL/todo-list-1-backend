const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const List = require("./models/lists");

const app = express();

app.use(express.json());
app.use(cors());

url = "mongodb://127.0.0.1:27017/todos";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DataBase"))
  .catch(console.error);

app.get("/lists", async (req, res) => {
  const Lists = await List.find();

  res.json(Lists);
});

app.post("/list/new", (req, res) => {
  const list = new List({
    listName: req.body.listName,
  });

  list.save();
  res.json(list);
});

app.delete("/list/delete/:id", async (req, res) => {
  const result = await List.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.put("/list/add/:id/:newTaskId", async (req, res) => {
  const list = await List.findById(req.params.id);

  list.list.push({
    taskId: req.params.newTaskId,

    task: req.body.task,
    complete: "task",
    checked: false,
  });

  list.save();
  res.json(list);
});

app.put("/list/remove/:listId/:taskId", async (req, res) => {
  List.update(
    { _id: req.params.listId },
    { $pull: { list: { taskId: req.params.taskId } } },
    function (err, deleted) {
      if (err) {
        console.log("er", err);
      } else {
        console.log(deleted);
      }
    }
  );
  res.json(List);
});

app.put("/list/complete/:id/:listId", async (req, res) => {
  console.log("route working");
  // console.log("ids", req.params.id, req.params.listId);
  // console.log("body", req.body.complete, req.body.check);
  // console.log("r.b", req.body);
  const { complete, checked } = req.body;
  console.log("stuff", complete, checked);
  List.updateOne(
    { "list.taskId": req.params.listId },
    {
      $set: {
        "list.$.complete": complete,
        "list.$.checked": checked,
      },
    },
    function (err, updated) {
      if (err) {
        console.log("err", err);
      } else {
        console.log(updated);
      }
    }
  );
});

app.listen(3001, () => console.log("Server started on port: 3001"));
