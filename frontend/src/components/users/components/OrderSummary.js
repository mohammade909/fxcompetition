import React, { useEffect } from "react";
import { createUserOrder } from "../../../actions/order";
import { useSelector, useDispatch } from "react-redux";
import { getWalletBalance } from "../../../actions/wallet";
const OrderSummary = ({ isOpen, onClose, orderDetails }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { wallet } = useSelector((state) => state.wallet);
  useEffect(() => {
    dispatch(getWalletBalance(auth.user_id)); 
  }, []);
  if (!isOpen) return null;

  const handleSubmit = () => {
    dispatch(
      createUserOrder({
        user_id: auth.user_id,
        plan_id: orderDetails.plan_id,
        price: orderDetails.price,
        tax: orderDetails.tax,
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="relative bg-white rounded-lg shadow-xl max-w-sm mx-auto p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Order Summary
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Thank you for your purchase! Here are the details of your order:
            </p>
            <div className="mt-4">
              <div className="flex justify-between py-2">
                <span className="font-medium">Plan:</span>
                <span>{orderDetails.plan_name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Price:</span>
                <span>${orderDetails.price}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Tax:</span>
                <span>${orderDetails.tax}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Total Amount:</span>
                <span>${orderDetails.total_amount}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Wallet Address:</span>
                <span>{wallet}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Start Date:</span>
                <span>
                  {new Date(orderDetails.start_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">End Date:</span>
                <span>
                  {new Date(orderDetails.end_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Activate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
