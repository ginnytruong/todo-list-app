const mysql = require("mysql");
const connection = require("../../connection");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { content, todoListId } = JSON.parse(event.body);
    const query = "INSERT INTO tasks (content, todo_list_id) VALUES (?, ?)";
    await queryDatabase(query, [content, todoListId]);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Task created successfully" }),
    };
  } catch (error) {
    console.error("Error adding task:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error adding task" }),
    };
  }
};

function queryDatabase(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
