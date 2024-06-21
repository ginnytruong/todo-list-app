require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleErrors } = require("./error-handler");
const controller = require("./controllers/controller");

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/todo-lists", controller.getTodoLists);
app.post("/api/todo-lists", controller.createTodoList);
app.delete("/api/todo-lists/:id", controller.deleteTodoList);
app.get("/api/todo-lists/:todoListId/tasks", controller.getTasks);
app.post("/api/tasks", controller.createTask);
app.delete("/api/tasks/:id", controller.deleteTask);
app.put("/api/tasks/:id", controller.updateTask);
app.get("/api/tasks/:todoListId", controller.getTasks);

app.use(handleErrors);

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "Not found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
