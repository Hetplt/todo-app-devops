const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/tododb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const TodoSchema = new mongoose.Schema({
  task: String
});

const Todo = mongoose.model("Todo", TodoSchema);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  await Todo.create({
    task: req.body.task
  });

  res.json({ message: "Task Added" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
