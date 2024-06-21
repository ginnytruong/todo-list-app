const mysql = require("mysql");
const connection = require("../connection");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { taskId } = event.queryStringParameters;
    const query = "DELETE FROM tasks WHERE id = ?";
    await queryDatabase(query, [taskId]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task deleted successfully" }),
    };
  } catch (error) {
    console.error("Error deleting task:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error deleting task" }),
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
