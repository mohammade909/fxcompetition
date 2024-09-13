const experss = require("express");
const router = experss.Router();

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const userController = require("../controllers/userController");

router.post('/', userController.createUser);
router.post('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
// router.get('/profile/:token', isAuthenticatedUser, userController.getUserProfile);


module.exports = router;
