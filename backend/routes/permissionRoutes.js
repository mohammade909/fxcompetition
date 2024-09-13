const express = require('express');
const router = express.Router();
const {
  createPermission,
  updatePermission,
  getPermissions,
  addEntityColumn,
  getAllColumns
} = require('../controllers/permissionController');

// Create a new permission entry for a user
router.post('/', createPermission);

// Update permissions for a user, adding a new column if necessary
router.put('/:user_id', updatePermission);

// Get permissions for a user
router.get('/:user_id', getPermissions);

// Add a new entity column dynamically
router.post('/add-entity', addEntityColumn);
router.get('/', getAllColumns);

module.exports = router;
