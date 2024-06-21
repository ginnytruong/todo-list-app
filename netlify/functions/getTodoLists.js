const mysql = require("mysql");
const connection = require("../connection");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const query = "SELECT * FROM todo_lists";
    const todoLists = await queryDatabase(query);

    return {
      statusCode: 200,
      body: JSON.stringify(todoLists),
    };
  } catch (error) {
    console.error("Error fetching todo lists:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching todo lists" }),
    };
  }
};

function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
