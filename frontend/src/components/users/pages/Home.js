import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "../../../actions/notifications";
import { Dialog } from "@headlessui/react";
import { getUserOrdersById } from "../../../actions/order";
import Pricing from "./Pricing";

import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import CompetitionList from "./CompetitionList";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { auth } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [latestUnreadNotification, setLatestUnreadNotification] =
    useState(null);

  useEffect(() => {
    dispatch(getUserNotifications(auth.user_id));
  }, [dispatch, auth.user_id]);
  useEffect(() => {
    if (auth.user_id) {
      dispatch(getUserOrdersById(auth.user_id));
    }
  }, [dispatch, auth.user_id]);

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const unreadNotifications = notifications.filter(
        (notification) => notification.read_status === 0
      );
      if (unreadNotifications.length > 0) {
        setLatestUnreadNotification(unreadNotifications[0]); // Get the latest unread notification
        setIsOpen(true); // Open the popup
      }
    }
  }, [notifications]);

  const handleClose = () => {
    if (latestUnreadNotification) {
      dispatch(
        markNotificationAsRead({
          userId: auth.user_id,
          notificationId: latestUnreadNotification.id,
        })
      );
    }
    setIsOpen(false);
  };
  return (
    <div className="min-h-screen flex flex-col bg-white bg-opacity-5 ">
      {orders.length > 0 ? <CompetitionList /> : <Pricing />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Card */}
        {latestUnreadNotification && (
          <Dialog
            as="div"
            className="relative z-10"
            open={isOpen}
            onClose={handleClose}
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Dialog.Panel className="bg-yellow-50 rounded-md w-2/3 flex p-4 mx-auto shadow-lg relative">
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      className="text-yellow-800 hover:text-yellow-600"
                      onClick={handleClose}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-5">
                      <ExclamationTriangleIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex justify-between max-w-3xl">
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-sm text-left font-medium text-yellow-800"
                        >
                          {latestUnreadNotification.title}
                        </Dialog.Title>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>{latestUnreadNotification.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
