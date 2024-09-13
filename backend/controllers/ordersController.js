const db = require("../config/database");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const ErrorHandler = require("../utils/errorHandler"); // Assuming you have this utility for handling errors.
const crypto = require("crypto");

// Helper function to generate a unique transaction ID (already available)
async function generateUniqueTransactionId() {
  let isUnique = false;
  let transactionId = "";

  while (!isUnique) {
    transactionId = crypto.randomBytes(8).toString("hex");
    const [existingTransaction] = await db
      .promise()
      .query("SELECT * FROM transactions WHERE transaction_id = ?", [
        transactionId,
      ]);
    if (existingTransaction.length === 0) {
      isUnique = true;
    }
  }

  return transactionId;
}

// Create a new user plan (subscribe user to a plan)
exports.createUserPlan = catchAsyncErrors(async (req, res, next) => {
  const { user_id, plan_id, price, tax } = req.body;

  // Calculate total amount
  const total_amount = parseFloat(price) + parseFloat(tax);

  // Get the current date as start_date and set end_date to one year later
  const start_date = new Date();
  const end_date = new Date();
  end_date.setFullYear(start_date.getFullYear() + 1); // Add 1 year to the start_date

  try {
    // Fetch wallet and check if balance is sufficient
    const [wallet] = await db
      .promise()
      .query("SELECT * FROM wallet WHERE user_id = ?", [user_id]);

    if (wallet.length === 0) {
      return next(new ErrorHandler("Wallet not found", 404));
    }

    if (wallet[0].balance < total_amount) {
      return next(new ErrorHandler("Insufficient wallet balance", 400));
    }

    // Deduct the total amount from the wallet balance
    await db
      .promise()
      .query("UPDATE wallet SET balance = balance - ? WHERE user_id = ?", [
        total_amount,
        user_id,
      ]);

    // Generate unique transaction ID for the plan purchase
    const transactionId = await generateUniqueTransactionId();

    // Set current date and time as transaction_date
    const transaction_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Create a transaction for the plan purchase
    await db
      .promise()
      .query(
        "INSERT INTO transactions (transaction_id, wallet_id, transaction_type, amount, transaction_date, description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          transactionId,
          wallet[0].wallet_id,
          "withdrawal",
          total_amount,
          transaction_date,
          "Buy Plan",
        ]
      );

    // Insert the new user plan into the user_plans table
    const [result] = await db
      .promise()
      .query(
        `INSERT INTO user_plans 
         (user_id, plan_id, price, tax, total_amount, wallet_address, start_date, end_date, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          user_id,
          plan_id,
          price,
          tax,
          total_amount,
          wallet[0].wallet_id,  // Ensure wallet_address is fetched correctly
          start_date,
          end_date,
        ]
      );

    res.status(201).json({
      message: "User plan created successfully",
      userPlanId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get a user's plan by user_plan_id
exports.getUserPlan = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    // Updated query to join user_plans, plans, and users tables
    const query = `
      SELECT 
        up.user_plan_id,
        up.user_id,
        up.plan_id,
        up.start_date,
        up.end_date,
        up.created_at,
        up.updated_at,
        up.status,
        up.payment_status,
        u.username AS user_username,
        u.email AS user_email,
        u.phone AS user_phone,
        p.plan_name,
        p.level,
        p.price,
        p.duration,
        p.features
      FROM 
        user_plans up
      JOIN 
        users u ON up.user_id = u.user_id
      JOIN 
        plans p ON up.plan_id = p.plan_id
      WHERE 
        up.user_plan_id = ?
    `;

    const [rows] = await db.promise().query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User plan not found" });
    }

    res.status(200).json({ success: true, order: rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
// Get all plans for a specific user
// Get all plans for a specific user, including plan details
exports.getUserPlansByUserId = catchAsyncErrors(async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await db.promise().query(
      `
        SELECT 
          user_plans.user_plan_id,
          user_plans.user_id,
          user_plans.plan_id,
          user_plans.start_date,
          user_plans.end_date,
          user_plans.status,
          user_plans.payment_status,
          user_plans.created_at,
          user_plans.updated_at,
          plans.plan_name,
          plans.level,
          plans.price,
          plans.duration,
          plans.features
        FROM user_plans
        JOIN plans ON user_plans.plan_id = plans.plan_id
        WHERE user_plans.user_id = ?
      `,
      [user_id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No user plans found for this user" });
    }

    res.status(200).json({ success: true, orders: rows });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Update a user plan (e.g., change plan, update dates)
exports.updateUserPlan = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const updateFields = [];
  const values = [];

 
  // Loop through the lorequest body and collect fields and values
  Object.keys(req.body).forEach((key) => {
    updateFields.push(`${key} = ?`);
    values.push(req.body[key]);
  });

  // Add the `updated_at` field and the user plan ID
  updateFields.push("updated_at = NOW()");
  values.push(id);

  // If no fields are provided in the body
  if (updateFields.length === 1) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  const query = `UPDATE user_plans SET ${updateFields.join(", ")} WHERE user_plan_id = ?`;

  try {
    const [result] = await db.promise().query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User plan not found" });
    }

    res.status(200).json({ message: "User plan updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// Delete a user plan (unsubscribe)
exports.deleteUserPlan = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db
      .promise()
      .query("DELETE FROM user_plans WHERE user_plan_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User plan not found" });
    }

    res.status(200).json({ message: "User plan deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

exports.getPlans = catchAsyncErrors(async (request, response) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "created_at",
    sortOrder = "asc",
    status,
  } = request.query;

  // Calculate offset
  const offset = (page - 1) * limit;

  // Base query with JOINs
  let query = `
    SELECT 
      up.user_plan_id, 
      up.user_id, 
      up.plan_id, 
      up.start_date, 
      up.end_date, 
      up.created_at, 
      up.updated_at, 
      up.status, 
      up.payment_status,
      u.username AS user_username,
      u.email AS user_email,
      u.phone AS user_phone,
      p.plan_name AS plan_name,
      p.level AS plan_level,
      p.price AS plan_price,
      p.duration AS plan_duration,
      p.features AS plan_features
    FROM user_plans up
    JOIN users u ON up.user_id = u.user_id
    JOIN plans p ON up.plan_id = p.plan_id
  `;

  // Add status filter if provided
  if (status) {
    query += ` WHERE up.status = '${status}'`;
  }

  // Add sorting
  query += ` ORDER BY ${sortBy} ${sortOrder}`;

  // Add pagination
  query += ` LIMIT ${limit} OFFSET ${offset}`;

  db.query(query, (err, results) => {
    if (err) {
      return response.status(500).json({ message: "Internal server error" });
    }

    // Fetch total count for pagination with JOINs
    let countQuery = `
      SELECT COUNT(*) AS count 
      FROM user_plans up
      JOIN users u ON up.user_id = u.user_id
      JOIN plans p ON up.plan_id = p.plan_id
    `;

    if (status) {
      countQuery += ` WHERE up.status = '${status}'`;
    }

    db.query(countQuery, (countErr, countResults) => {
      if (countErr) {
        return response.status(500).json({ message: "Internal server error" });
      }

      const totalCount = countResults[0].count;
      const totalPages = Math.ceil(totalCount / limit);

      response.status(200).json({
        orders: results,
        totalPages: totalPages,
        currentPage: parseInt(page, 10),
      });
    });
  });
});
