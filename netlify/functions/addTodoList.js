const mysql = require("mysql");
const connection = require("../../connection");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { name } = JSON.parse(event.body);
    const query = "INSERT INTO todo_lists (name) VALUES (?)";
    await queryDatabase(query, [name]);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Todo list created successfully" }),
    };
  } catch (error) {
    console.error("Error adding todo list:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error adding todo list" }),
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
