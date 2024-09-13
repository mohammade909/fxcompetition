const experss = require("express");
const router = experss.Router();

const { isAuthenticatedUser } = require("../middlewares/authMiddleware");
const {
  signin,
  signout,
  forgotPassword,
  signup,
  getServerStatus,
  shutdownServer,
  restartServer,
  resetPassword,
  getProfile,
} = require("../controllers/authController");
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", signout);
router.get("/", isAuthenticatedUser, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/shutdown", shutdownServer);

router.get("/status", getServerStatus);
module.exports = router;
