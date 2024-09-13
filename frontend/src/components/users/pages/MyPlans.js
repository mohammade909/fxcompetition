import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersById } from "../../../actions/order";
import {
  StarIcon,
  CurrencyDollarIcon,
  CheckBadgeIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
const MyPlans = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user_id) {
      dispatch(getUserOrdersById(auth.user_id));
    }
  }, [dispatch, auth.user_id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">My Active Plans</h2>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const isActive = order.status === "active";

            return (
              <div
                key={order.user_plan_id}
                className={`${
                  isActive
                    ? "bg-gradient-to-r from-[#82A6F3] to-gray-100"
                    : "bg-gradient-to-r from-gray-600 to-gray-200"
                } text-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300`}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 flex text-gray-600 items-center">
                    <StarIcon
                      className={`h-6 w-6 mr-2 ${
                        isActive ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                    {order.plan_name}
                  </h3>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <CheckBadgeIcon
                      className={`h-5 w-5 mr-2 ${
                        isActive ? "text-green-400" : "text-gray-300"
                      }`}
                    />
                    <span className="font-semibold">Level:</span> {order.level}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <CurrencyDollarIcon
                      className={`h-5 w-5 mr-2 ${
                        isActive ? "text-green-300" : "text-gray-300"
                      }`}
                    />
                    <span className="font-semibold">Price:</span> ${order.price}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <CheckCircleIcon
                      className={`h-5 w-5 mr-2 ${
                        isActive ? "text-blue-300" : "text-gray-300"
                      }`}
                    />
                    <span className="font-semibold">Status:</span>{" "}
                    {order.status}
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center">
                    {order.payment_status === "Paid" ? (
                      <CheckCircleIcon
                        className={`h-5 w-5 mr-2 ${
                          isActive ? "text-green-400" : "text-gray-300"
                        }`}
                      />
                    ) : (
                      <XCircleIcon
                        className={`h-5 w-5 mr-2 ${
                          isActive ? "text-red-400" : "text-gray-300"
                        }`}
                      />
                    )}
                    <span className="font-semibold">Payment Status:</span>{" "}
                    {order.payment_status}
                  </p>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <ClockIcon
                      className={`h-5 w-5 mr-2 ${
                        isActive ? "text-yellow-300" : "text-gray-300"
                      }`}
                    />
                    <span className="font-semibold">Total Duration:</span>{" "}
                    {order.duration} months
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <CalendarIcon
                      className={`h-5 w-5 mr-2 ${
                        isActive ? "text-gray-200" : "text-gray-400"
                      }`}
                    />
                    <span className="font-semibold">Start Date:</span>{" "}
                    {new Date(order.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <CalendarIcon
                      className={`h-5 w-5 mr-2 ${
                        isActive ? "text-gray-200" : "text-gray-400"
                      }`}
                    />
                    <span className="font-semibold ">End Date:</span>{" "}
                    {new Date(order.end_date).toLocaleDateString()}
                  </p>
                  <h4 className="text-lg font-semibold mb-2">Features:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {JSON.parse(order.features).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-600">
          You have no active plans.
        </div>
      )}
    </div>
  );
};

export default MyPlans;
