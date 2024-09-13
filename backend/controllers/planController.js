const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const db = require("../config/database");

exports.createPlan = catchAsyncErrors(async (req, res) => {
  
  const { plan_name, level, price, duration } = req.body;

  if (!plan_name || !level || !price) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  try {
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO plans (plan_name, level, price, duration, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [plan_name, level, price, duration]
      );

    console.log(result);
    
    res.status(201).json({
      message: "Plan created successfully",
    });
  } catch (error) {
    console.log(error);
    
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

exports.getPlan = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM plans WHERE plan_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ success: true, plan: rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

exports.getAllPlans = catchAsyncErrors(async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM plans");

    res.status(200).json({ success: true, plans: rows });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

exports.updatePlan = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  
  const allowedFields = ["plan_name", "level", "price", "description"];
  const updates = [];

  allowedFields.forEach((field) => {
    if (req.body[field]) {
      updates.push(`${field} = ?`);
    }
  });

  if (updates.length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  // Prepare the values for the SQL query
  const values = allowedFields
    .map((field) => req.body[field])
    .filter((value) => value !== undefined);
  values.push(id);

  try {
    // First, update the plan
    const [updateResult] = await db
      .promise()
      .query(
        `UPDATE plans SET ${updates.join(
          ", "
        )}, updated_at = NOW() WHERE plan_id = ?`,
        values
      );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Fetch the updated plan
    const [updatedPlan] = await db
      .promise()
      .query("SELECT * FROM plans WHERE plan_id = ?", [id]);

    res.status(200).json({
      message: "Plan updated successfully",
      updatedPlan: updatedPlan[0], // Send back the updated plan
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

exports.deletePlan = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db
      .promise()
      .query("DELETE FROM plans WHERE plan_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ message: "Plan deleted successfully",planId:id});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
