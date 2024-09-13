const express = require('express');
const router = express.Router();
const {
  createEnrollment,
  getEnrollmentById,
  getEnrollmentsByUserId,
  getAllEnrollments,
  updateEnrollment,
  deleteEnrollment
} = require('../controllers/enrollmentController');

// Route to create a new enrollment
router.post('/', createEnrollment);

// Route to get a specific enrollment by ID along with competition details
router.get('/:id', getEnrollmentById);

// Route to get all enrollments for a specific user along with competition details
router.get('/user/:user_id', getEnrollmentsByUserId);

// Route to get all enrollments
router.get('', getAllEnrollments);

// Route to update an enrollment by ID
router.put('/:id', updateEnrollment);

// Route to delete an enrollment by ID
router.delete('/:id', deleteEnrollment);

module.exports = router;
