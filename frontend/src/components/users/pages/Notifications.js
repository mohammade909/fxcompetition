import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "../../../actions/notifications";
import { BellIcon } from "@heroicons/react/20/solid";

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserNotifications(auth.user_id));
  }, [dispatch, auth.user_id]);

  return (
    <div className="min-h-screen bg-opacity-5   flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="w-full max-w-3xl">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 mb-2 rounded-lg shadow-custom border w-full ${
                notification.read_status === 0
                  ? "bg-blue-50 border-blue-200"
                  : "bg-yellow-50 border-gray-200"
              } flex items-center`}
            >
              <BellIcon
                className={`w-6 h-6 mr-3 ${
                  notification.read_status === 0
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              />
              <div className="flex-grow">
                <p className="font-semibold text-gray-800">
                  {notification.title}
                </p>
                <p className="text-gray-600 text-sm">
                  {notification.message}
                </p>
              </div>
              <p className="text-gray-500 text-xs">
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
