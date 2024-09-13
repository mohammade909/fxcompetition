const express = require("express");
const router = express.Router();
const { getAllPlans, getPlan, deletePlan, updatePlan, createPlan  } = require("../controllers/planController");

// Route to create a competition
router.post("/", createPlan);

// Route to get a single competition by ID
router.get("/:id", getPlan);

// Route to get all competitions
router.get("/", getAllPlans);

// Route to update a competition by ID
router.put("/:id", updatePlan);

// Route to delete a competition by ID
router.delete("/:id", deletePlan);

module.exports = router;
