const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const db = require("../config/database");

exports.createCompetition = catchAsyncErrors(async (req, res) => {
  const {
    name,
    description,
    start_date,
    end_date,
    level_required,
    created_by,
  } = req.body;

  try {
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO competitions (name, description, start_date, end_date, level_required, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
        [name, description, start_date, end_date, level_required, created_by]
      );

    res.status(201).json({
      message: "Competition created successfully",
      competitionId: result.insertId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

exports.getCompetition = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the competition details
    const [competitionRows] = await db
      .promise()
      .query(`SELECT * FROM competitions WHERE competition_id = ?`, [id]);

    if (competitionRows.length === 0) {
      return res.status(404).json({ message: "Competition not found" });
    }

    const competition = competitionRows[0];

    // Fetch all enrollments for this competition with corresponding user details
    const [enrollmentRows] = await db.promise().query(
      `SELECT 
        ce.enrollment_id, 
        ce.competition_id, 
        u.user_id, 
        u.username, 
        u.email, 
        u.first_name, 
        u.last_name,
        u.current_plan,
        u.user_image
      FROM 
        competition_enrollments ce
      LEFT JOIN 
        users u ON ce.user_id = u.user_id
      WHERE 
        ce.competition_id = ?`,
      [id]
    );

    // Combine competition details and enrollment data
    res.status(200).json({
      success: true,
      competition: {
        ...competition,
        enrollments: enrollmentRows, // Add enrollments with user details here
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

exports.getAllCompetitions = catchAsyncErrors(async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        c.competition_id, 
        c.name, 
        c.description, 
        c.start_date, 
        c.end_date, 
        c.level_required, 
        c.status, 
        c.created_by, 
        c.created_at, 
        c.updated_at,
        IFNULL(
          JSON_ARRAYAGG(
            IF(u.user_id IS NOT NULL, 
              JSON_OBJECT(
                'user_id', u.user_id,
                'username', u.username, 
                'first_name', u.first_name, 
                'last_name', u.last_name,
                'email', u.email,
                'phone', u.phone,
                'user_type', u.user_type,
                'kyc_status', u.kyc_status,
                'login_status', u.login_status,
                'current_plan', u.current_plan,
                'user_image', u.user_image,
                'created_at', u.created_at,
                'updated_at', u.updated_at
              ), 
              NULL
            )
          ), 
          JSON_ARRAY()
        ) AS enrolled_users
      FROM 
        competitions c
      LEFT JOIN 
        competition_enrollments ce ON c.competition_id = ce.competition_id
      LEFT JOIN 
        users u ON ce.user_id = u.user_id
      GROUP BY 
        c.competition_id
    `);

    res.status(200).json({ success: true, competitions: rows });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



exports.updateCompetition = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const allowedFields = [
    "name",
    "description",
    "start_date",
    "end_date",
    "level_required",
    "status",
  ];
  const updates = [];

  // Loop through the allowed fields and check if they're present in req.body
  allowedFields.forEach((field) => {
    if (req.body[field]) {
      updates.push(`${field} = ?`);
    }
  });

  // If there are no fields to update, return an error
  if (updates.length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  // Prepare the values for the SQL query
  const values = allowedFields
    .map((field) => req.body[field])
    .filter((value) => value !== undefined);
  values.push(id); // Add the competition_id for the WHERE clause

  try {
    const [result] = await db
      .promise()
      .query(
        `UPDATE competitions SET ${updates.join(
          ", "
        )}, updated_at = NOW() WHERE competition_id = ?`,
        values
      );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Competition not found" });
    }

    res.status(200).json({ message: "Competition updated successfully" });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

exports.deleteCompetition = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db
      .promise()
      .query("DELETE FROM competitions WHERE competition_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Competition not found" });
    }

    res.status(200).json({ message: "Competition deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
