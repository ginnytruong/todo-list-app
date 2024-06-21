const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTodoLists = async (req, res, next) => {
  try {
    const todoLists = await prisma.todoList.findMany();
    res.json(todoLists);
  } catch (error) {
    next(error);
  }
};

const createTodoList = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newList = await prisma.todoList.create({
      data: {
        name,
      },
    });
    res.json(newList);
  } catch (error) {
    next(error);
  }
};

const deleteTodoList = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.task.deleteMany({
      where: {
        todoListId: parseInt(id),
      },
    });
    const deletedList = await prisma.todoList.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedList);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { content, todoListId, completed } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        content,
        todoListId,
        completed: completed !== undefined ? completed : false,
      },
    });
    res.json(newTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed },
    });
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  const { todoListId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        todoListId: parseInt(todoListId),
      },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodoLists,
  createTodoList,
  deleteTodoList,
  createTask,
  deleteTask,
  updateTask,
  getTasks,
};
