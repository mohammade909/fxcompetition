const express = require("express");
const router = express.Router();
const { createCompetition, getCompetition, getAllCompetitions, updateCompetition, deleteCompetition } = require("../controllers/competitionController");

// Route to create a competition
router.post("/", createCompetition);

// Route to get a single competition by ID
router.get("/:id", getCompetition);

// Route to get all competitions
router.get("/", getAllCompetitions);

// Route to update a competition by ID
router.put("/:id", updateCompetition);

// Route to delete a competition by ID
router.delete("/:id", deleteCompetition);

module.exports = router;
