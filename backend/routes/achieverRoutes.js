const experss = require("express");
const router = experss.Router();

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const achieverController = require("../controllers/achieverController");

router.get("/", achieverController.getLevelsWithUsers);
router.put("/levels/:user_id", achieverController.updateLevelStatusByUserId);

// router.get('/profile/:token', isAuthenticatedUser, userController.getUserProfile);

module.exports = router;
