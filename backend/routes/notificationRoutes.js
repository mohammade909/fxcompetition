const express = require("express");
const { 
    createNotification, 
    getUserNotifications, 
    markNotificationAsRead, 
    deleteNotification, 
    getAllNotifications
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/", createNotification);
router.get("/", getAllNotifications);
router.get("/user/:userId", getUserNotifications);
router.patch("/:userId/:notificationId", markNotificationAsRead);
router.delete("/:notificationId", deleteNotification);

module.exports = router;
