const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const db = require("../config/database");

dotenv.config();

exports.createUser = catchAsyncErrors(async (request, response) => {
  const userFields = request.body;
  const columns = Object.keys(userFields).join(", ");
  const values = Object.values(userFields);
  const placeholders = values.map(() => "?").join(", ");

  const query = `INSERT INTO users (${columns}) VALUES (${placeholders})`;

  db.query(query, values, (err, results) => {
    if (err) {
      return response.status(500).json({ message: "Internal server error" });
    }
    response
      .status(201)
      .json({ message: "User created successfully", userId: results.insertId });
  });
});

exports.updateUser = catchAsyncErrors(async (request, response) => {
  const userId = request.params.userId;
  const userFields = request.body;
  console.log(userId, request.body);

  const columns = Object.keys(userFields)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(userFields), userId];

  const query = `UPDATE users SET ${columns}, updated_at = NOW() WHERE user_id = ?`;

  db.query(query, values, (err, results) => {
    if (err) {
      return response.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json({ message: "User updated successfully" });
  });
});

exports.deleteUser = catchAsyncErrors(async (request, response) => {
  const userId = request.params.userId;
  const query = "DELETE FROM users WHERE user_id = ?";
  console.log("delete ");
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      return response.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json({ message: "User deleted successfully" });
  });
});

exports.getUsers = catchAsyncErrors(async (request, response) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "created_at",
    sortOrder = "asc",
    status,
  } = request.query;

  // Calculate offset
  const offset = (page - 1) * limit;

  // Base query
  let query = `SELECT * FROM users`;

  // Add status filter if provided
  if (status) {
    query += ` WHERE status = '${status}'`;
  }

  // Add sorting
  query += ` ORDER BY ${sortBy} ${sortOrder}`;

  // Add pagination
  query += ` LIMIT ${limit} OFFSET ${offset}`;

  db.query(query, (err, results) => {
    if (err) {
      return response.status(500).json({ message: "Internal server error" });
    }

    // Fetch total count for pagination
    db.query(
      "SELECT COUNT(*) AS count FROM users",
      (countErr, countResults) => {
        if (countErr) {
          return response
            .status(500)
            .json({ message: "Internal server error" });
        }

        const totalCount = countResults[0].count;
        const totalPages = Math.ceil(totalCount / limit);

        response.status(200).json({
          users: results,
          totalPages: totalPages,
          currentPage: parseInt(page, 10),
        });
      }
    );
  });
});

exports.getUserById = catchAsyncErrors(async (request, response) => {
  const userId = request.params.userId;
  const query = "SELECT * FROM users WHERE user_id = ?";
console.log("single");

  db.query(query, [userId], (err, results) => {
    if (err) {
      return response.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json({ user: results[0] });
  });
});

exports.getUserProfile = catchAsyncErrors(async (request, response) => {
  const userId = request.params.userId;
  const query = "SELECT * FROM users WHERE user_id = ?";
console.log("profie");

  db.query(query, [userId], (err, results) => {
    if (err) {
      return response.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json(results[0]);
  });
});

