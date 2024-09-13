import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionHistoryWithUsers } from "../../../actions/wallet";

const TransactionList = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error, totals } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(getTransactionHistoryWithUsers());
  }, [dispatch]);

  if (loading === "loading") {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      {/* Totals Section */}
      <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700">Transaction Totals</h2>
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            <strong>Total Deposits:</strong> ${totals?.total_deposit || 0}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Total Withdrawals:</strong> ${totals?.total_withdrawal || 0}
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Wallet ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Transaction Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                User Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions?.map((transaction) => (
              <tr key={transaction.transaction_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.transaction_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.wallet_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.transaction_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.transaction_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
