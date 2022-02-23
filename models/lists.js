const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listName: { type: String, required: true },
  list: [
    {
      taskId: { type: String, required: true },
      task: { type: String, required: true },
      complete: { type: String, required: true },
      checked: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("List", ListSchema);
