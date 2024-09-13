import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders, updateOrder } from '../../../actions/order'; // Adjust import as needed
import { Link } from 'react-router-dom';
import SuccessModal from '../helperComponets/SuccessModal'
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const paymentStatusOptions = [
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
];

const getStatusClasses = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-blue-300 text-blue-900';
    case 'completed':
      return 'bg-green-300 text-green-900';
    case 'canceled':
      return 'bg-red-300 text-red-900';
    default:
      return '';
  }
};

const OrderRow = ({ order, updatedStatuses, handleStatusChange, handleSave }) => (
  <tr key={order.user_plan_id}>
  
    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
      {order.user_email}
    </td>
    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
      {order.plan_name}
    </td>
    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
      {new Date(order.start_date).toLocaleDateString()}
    </td>
    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
      {new Date(order.end_date).toLocaleDateString()}
    </td>
    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
      <select
        className={`rounded-md ${getStatusClasses(order.status)} px-3 py-2`}
        value={updatedStatuses[order.user_plan_id]?.status || order.status}
        onChange={(e) => handleStatusChange(order.user_plan_id, 'status', e.target.value)}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </td>
    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
      <select
        className={`rounded-md ${getStatusClasses(order.payment_status)} px-3 py-2`}
        value={updatedStatuses[order.user_plan_id]?.payment_status || order.payment_status}
        onChange={(e) => handleStatusChange(order.user_plan_id, 'payment_status', e.target.value)}
      >
        {paymentStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </td>
    <td className="border-b border-gray-200 bg-white py-5 text-sm">
      <button
        className="text-blue-600 text-xs mx-2 hover:text-blue-900"
        onClick={() => handleSave(order.user_plan_id)}
      >
        Save
      </button>
      <Link
        to={`/admin/orders/overview/${order.user_plan_id}`}
        className="text-xs"
      >
        View Details
      </Link>
    </td>
    
  </tr>
);

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, totalPages, currentPage, loading } = useSelector((state) => state.orders);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [updatedStatuses, setUpdatedStatuses] = useState({});
  const [open, setOpen] = useState(false)
  useEffect(() => {
    dispatch(getOrders({ page, limit: 10 }));
  }, [dispatch, page, reload]);

  const handleStatusChange = (orderId, key, value) => {
    setUpdatedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: {
        ...prevStatuses[orderId],
        [key]: value,
      },
    }));
  };

  const handleSave = (orderId) => {
    const updatedOrder = updatedStatuses[orderId];
     
    if (updatedOrder) {
      dispatch(updateOrder({ id:orderId, orderData: updatedOrder }));
      setOpen(true)
    }
    setReload(true);
  };

  return (
    <div className="mx-auto w-full px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Order List</h2>
          <span className="text-xs text-gray-500">View and manage orders</span>
        </div>
        <SuccessModal open={open} setOpen={setOpen}/>
        <div className="flex items-center justify-between">
          <div className="ml-10 space-x-8 lg:ml-40">
            <button className="flex items-center gap-2 rounded-md bg-teal-900 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
              </svg>
              CSV
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-teal-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
               
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Start Date</th>
                <th className="px-5 py-3">End Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Payment Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {orders?.map((order) => (
                <OrderRow
                  key={order.user_plan_id}
                  order={order}
                  updatedStatuses={updatedStatuses}
                  handleStatusChange={handleStatusChange}
                  handleSave={handleSave}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm"> Showing {page} of {totalPages} Pages </span>
          <div className="mt-2 inline-flex sm:mt-0">
            <button
              className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <button
              className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
