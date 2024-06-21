const mysql = require("mysql");
const connection = require("../../connection");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { todoListId } = event.queryStringParameters;
    const query = "DELETE FROM todo_lists WHERE id = ?";
    await queryDatabase(query, [todoListId]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Todo list deleted successfully" }),
    };
  } catch (error) {
    console.error("Error deleting todo list:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error deleting todo list" }),
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
