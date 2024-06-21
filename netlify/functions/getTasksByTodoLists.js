const mysql = require("mysql");
const connection = require("../../connection");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { todoListId } = event.queryStringParameters;
    const query = "SELECT * FROM tasks WHERE todo_list_id = ?";
    const tasks = await queryDatabase(query, [todoListId]);

    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching tasks" }),
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
