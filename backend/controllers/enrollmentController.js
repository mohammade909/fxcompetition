const db = require("../config/database");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const ErrorHandler = require("../utils/errorHandler");

// Create a new enrollment
exports.createEnrollment = catchAsyncErrors(async (req, res) => {
  const { user_id, competition_id } = req.body;

  try {
    const [result] = await db.promise().query(
      `INSERT INTO competition_enrollments (user_id, competition_id, enrollment_date, created_at, updated_at)
       VALUES (?, ?, NOW(), NOW(), NOW())`,
      [user_id, competition_id]
    );

    res.status(201).json({
      message: "Enrollment created successfully",
      enrollmentId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get a specific enrollment by ID
exports.getEnrollmentById = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.promise().query(
      `SELECT competition_enrollments.*, competitions.*
         FROM competition_enrollments
         JOIN competitions ON competition_enrollments.competition_id = competitions.competition_id
         WHERE competition_enrollments.enrollment_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({
      success: true,
      enrollment: rows[0], // This will include both enrollment and competition details
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getEnrollmentsByUserId = catchAsyncErrors(async (req, res) => {
  const { user_id } = req.params;
  console.log("Fetching enrollments for user:", user_id);

  try {
    // Query to get enrollments along with competition details
    const [rows] = await db.promise().query(
      `SELECT competition_enrollments.*, 
              competitions.competition_id, 
              competitions.name AS competition_name, 
              competitions.description, 
              competitions.start_date, 
              competitions.end_date, 
              competitions.level_required, 
              competitions.status, 
              competitions.created_by, 
              competitions.created_at AS competition_created_at, 
              competitions.updated_at AS competition_updated_at
       FROM competition_enrollments
       JOIN competitions ON competition_enrollments.competition_id = competitions.competition_id
       WHERE competition_enrollments.user_id = ?`,
      [user_id]
    );

    // Check if any enrollments are found
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No enrollments found for this user" });
    }

    // Return the enrollments with competition details
    res.status(200).json({
      success: true,
      enrollments: rows,
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error.message);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});
// Get all enrollments
exports.getAllEnrollments = catchAsyncErrors(async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query(`SELECT * FROM competition_enrollments`);

    res.status(200).json({
      success: true,
      enrollments: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Update an enrollment
exports.updateEnrollment = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  // Build the SQL query dynamically
  const updates = Object.keys(updateFields)
    .map((field, index) => `${field} = ?`)
    .join(", ");

  const values = Object.values(updateFields);
  values.push(id); // Add the ID for the WHERE clause

  const updateQuery = `UPDATE competition_enrollments SET ${updates}, updated_at = NOW() WHERE enrollment_id = ?`;

  try {
    // Execute the update query
    const [result] = await db.promise().query(updateQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Query to get the updated enrollment
    const [updatedRows] = await db
      .promise()
      .query(`SELECT * FROM competition_enrollments WHERE enrollment_id = ?`, [
        id,
      ]);

    res.status(200).json({
      message: "Enrollment updated successfully",
      enrollment: updatedRows[0], // Return the updated enrollment details
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Delete an enrollment
exports.deleteEnrollment = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db
      .promise()
      .query(`DELETE FROM competition_enrollments WHERE enrollment_id = ?`, [
        id,
      ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({
      message: "Enrollment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});
