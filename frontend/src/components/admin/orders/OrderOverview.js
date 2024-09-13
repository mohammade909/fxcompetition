import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../../actions/order'; // Update import according to your actions

const OrderView = () => {
  const { id } = useParams(); // Get the order ID from URL params
  const dispatch = useDispatch();
  const {order} = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id));
    }
  }, [dispatch, id]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h1>
      {order ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col sm:flex-row mb-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Information</h2>
              <p><strong>Order ID:</strong> {order.user_plan_id}</p>
              <p><strong>User ID:</strong> {order.user_id}</p>
              <p><strong>Plan ID:</strong> {order.plan_id}</p>
              <p><strong>Status:</strong> <span className={`text-white px-2 py-1 rounded ${getStatusClasses(order.status)}`}>{order.status}</span></p>
              <p><strong>Payment Status:</strong> <span className={`text-white px-2 py-1 rounded ${getStatusClasses(order.payment_status)}`}>{order.payment_status}</span></p>
            </div>
            <div className="flex-1 mt-6 sm:mt-0 sm:ml-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Plan Details</h2>
              <p><strong>Plan Name:</strong> {order.plan_name}</p>
              <p><strong>Plan Level:</strong> {order.level}</p>
              <p><strong>Plan Price:</strong> ${order.price}</p>
              <p><strong>Plan Duration:</strong> {order.duration} months</p>
              <p><strong>Plan Features:</strong></p>
              <ul className="list-disc ml-5">
                {order?.features && JSON.parse(order.features).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gray-100 border-t border-gray-300 pt-4">
            <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(order.updated_at).toLocaleString()}</p>
            <p><strong>User Email:</strong> {order.user_email}</p>
            <p><strong>User Phone:</strong> {order.user_phone}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading order details...</p>
      )}
    </div>
  );
};

// Utility function for status classes
const getStatusClasses = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-blue-500 text-blue-100';
    case 'completed':
      return 'bg-green-500 text-green-100';
    case 'canceled':
      return 'bg-red-500 text-red-100';
    default:
      return '';
  }
};

export default OrderView;
