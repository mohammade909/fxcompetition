const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const db = require("../config/database");

// Create a new notification
exports.createNotification = catchAsyncErrors(async (req, res, next) => {
  const { title, message, users } = req.body;

  try {
    await db.promise().query("START TRANSACTION");

    const [notificationResult] = await db
      .promise()
      .query(
        "INSERT INTO notifications (title, message) VALUES (?, ?)",
        [title, message]
      );

    const notificationId = notificationResult.insertId;

    const userNotificationValues = users.map((userId) => [
      userId,
      notificationId,
    ]);

    await db
      .promise()
      .query(
        "INSERT INTO user_notifications (user_id, notification_id) VALUES ?",
        [userNotificationValues]
      );

    await db.promise().query("COMMIT");

    res.status(201).json({
      message: "Notification created and sent successfully",
      notificationId: notificationId,
    });
  } catch (error) {
    await db.promise().query("ROLLBACK");
    return next(new ErrorHandler("Error creating notification", 500));
  }
});

exports.getAllNotifications = catchAsyncErrors(async (req, res, next) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM notifications");

    res.status(200).json({
      success: true,
      notifications: rows,
    });
  } catch (error) {
    return next(new ErrorHandler("Error fetching notifications", 500));
  }
})

// Get all notifications for a specific user
exports.getUserNotifications = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  try {
    const [notifications] = await db
      .promise()
      .query(
        `SELECT n.id, n.title, n.message, n.created_at, n.updated_at, un.read_status 
         FROM notifications n
         INNER JOIN user_notifications un ON n.id = un.notification_id
         WHERE un.user_id = ?`,
        [userId]
      );

    res.status(200).json({
      success: true,
      notifications: notifications,
    });
  } catch (error) {
    return next(new ErrorHandler("Error retrieving notifications", 500));
  }
});

// Mark a notification as read
exports.markNotificationAsRead = catchAsyncErrors(async (req, res, next) => {
  const { userId, notificationId } = req.params;

  try {
    const [result] = await db
      .promise()
      .query(
        `UPDATE user_notifications 
         SET read_status = TRUE 
         WHERE user_id = ? AND notification_id = ?`,
        [userId, notificationId]
      );

    if (result.affectedRows === 0) {
      return next(new ErrorHandler("Notification not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    return next(new ErrorHandler("Error marking notification as read", 500));
  }
});

// Delete a notification
exports.deleteNotification = catchAsyncErrors(async (req, res, next) => {
  const { notificationId } = req.params;

  try {
    await db.promise().query("START TRANSACTION");

    // Delete from user_notifications first due to foreign key constraints
    await db
      .promise()
      .query(
        "DELETE FROM user_notifications WHERE notification_id = ?",
        [notificationId]
      );

    // Delete from notifications table
    const [deleteResult] = await db
      .promise()
      .query(
        "DELETE FROM notifications WHERE id = ?",
        [notificationId]
      );

    if (deleteResult.affectedRows === 0) {
      await db.promise().query("ROLLBACK");
      return next(new ErrorHandler("Notification not found", 404));
    }

    await db.promise().query("COMMIT");

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
      notificationId
    });
  } catch (error) {
    await db.promise().query("ROLLBACK");
    return next(new ErrorHandler("Error deleting notification", 500));
  }
});
