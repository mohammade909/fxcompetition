const express = require('express');
const router = express.Router();
const {
  createUserPlan,
  getUserPlan,
  getUserPlansByUserId,
  updateUserPlan,
  deleteUserPlan,
  getPlans
} = require('../controllers/ordersController');

// POST /api/v1/user-plans -> Create a new user plan
router.post('/', createUserPlan);
router.get('/', getPlans);


// GET /api/v1/user-plans/:id -> Get a user plan by user_plan_id
router.get('/:id', getUserPlan);

// GET /api/v1/user-plans/user/:user_id -> Get all plans for a specific user by user_id
router.get('/user/:user_id', getUserPlansByUserId);

// PUT /api/v1/user-plans/:id -> Update a user plan by user_plan_id
router.put('/:id', updateUserPlan);

// DELETE /api/v1/user-plans/:id -> Delete a user plan by user_plan_id
router.delete('/:id', deleteUserPlan);

module.exports = router;
