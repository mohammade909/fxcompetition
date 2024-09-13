const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database"); // Ensure this config exports the database connection

dotenv.config();

const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {  // Use db.query directly
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Controller to get levels with user details
exports.getLevelsWithUsers = catchAsyncErrors(async (req, res, next) => {
  const { levelName } = req.query; // Filter by level name

  try {
    // Base query to get levels with associated user and package details
    let levelsQuery = `
      SELECT l.level_id, l.level_name, l.description, l.fee,l.status, l.created_at, l.updated_at,
             l.package_id, p.package_name,
             u.user_id, u.username, u.email, u.first_name, u.last_name
      FROM levels l
      JOIN users u ON l.user_id = u.user_id
      JOIN packages p ON l.package_id = p.package_id
    `;
    let queryParams = [];

    // Add filter if levelName is provided
    if (levelName) {
      levelsQuery += " WHERE l.level_name LIKE ?";
      queryParams.push(`%${levelName}%`);
    }

    // Finalize the query
    levelsQuery += ";";

    // Execute the query
    const results = await query(levelsQuery, queryParams);

    if (results.length === 0) {
      return next(new ErrorHandler("No levels found", 404));
    }

    // Send the response
    res.status(200).json({ message: "Successful", levels: results });
  } catch (error) {
    console.error("Error fetching levels, users, and packages:", error);
    return next(new ErrorHandler("Internal server error", 500));
  }
});


exports.updateLevelStatusByUserId = catchAsyncErrors(async (req, res, next) => {
  const { user_id } = req.params;  // Assuming user_id is passed as a URL parameter
  const { level_status } = req.body;  // Assuming level_status is passed in the request body

  // Check if required data is provided
  if (!user_id || !level_status) {
      return res.status(400).json({
          success: false,
          message: "User ID and level status are required.",
      });
  }

  const query = `
      UPDATE levels
      SET status = ?, updated_at = NOW()
      WHERE user_id = ?
  `;

  db.query(query, [level_status, user_id], (err, results) => {
      if (err) {
          return next(err);
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({
              success: false,
              message: `No levels found for user ID ${user_id}`,
          });
      }

      res.status(200).json({
          success: true,
          message: `Level status updated successfully for user ID ${user_id}`,
      });
  });
});