// src/components/UserInfo.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getUserById } from "../../actions/user";
import { getTransactionHistory, getWalletBalance } from "../../actions/wallet";
import Spinner from "../../BaseFiles/Spinner"; // A simple loading spinner component
import DepositByAdmin from "../../components/admin/components/DepositByAdmin";

const UserInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [open, setOpen] = useState(false);
  const { wallet, balance, transactions } = useSelector(
    (state) => state.wallet
  );
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
      dispatch(getWalletBalance(id));
      dispatch(getTransactionHistory(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Personal Information":
        return (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Personal Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong className="font-medium">Username:</strong>{" "}
                {user.username}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium">Email:</strong> {user.email}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium">First Name:</strong>{" "}
                {user.first_name}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium">Last Name:</strong>{" "}
                {user.last_name}
              </p>
              <p className="text-gray-600">
                <strong className="font-medium">Phone:</strong> {user.phone}
              </p>
            </div>
          </div>
        );
      case "Change Password":
        return (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Change Password
            </h2>
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object({
                currentPassword: Yup.string().required(
                  "Current Password is required"
                ),
                newPassword: Yup.string()
                  .min(6, "New Password must be at least 6 characters")
                  .required("New Password is required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                  .required("Confirm Password is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  // Submit the form values to the backend or handle them as needed
                  console.log(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <Field
                      type="password"
                      name="currentPassword"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="currentPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <Field
                      type="password"
                      name="newPassword"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={isSubmitting}
                    >
                      Change Password
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        );
      case "Verification Center":
        return <div className="p-6">Verification Center Content</div>;
      case "Wallet Information":
        return (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Wallet Information
            </h2>
            <div className="flex flex-col space-y-4">
              <div>
                <strong className="font-medium text-gray-600">Balance:</strong>{" "}
                ${balance}
              </div>
              <div>
                <strong className="font-medium text-gray-600">
                  Account No. :
                </strong>{" "}
                {wallet}
              </div>
              <div>
                <strong className="font-medium text-gray-600">
                  Transactions:
                </strong>{" "}
                {transactions.length}
              </div>
              <div className="flex  justify-between">
                <button
                  onClick={() =>
                    setShowTransactionHistory(!showTransactionHistory)
                  }
                  className="mt-4  inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showTransactionHistory
                    ? "Hide Transactions"
                    : "Show Transactions"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="mt-4  inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Deposit
                </button>
              </div>
              <DepositByAdmin open={open} setOpen={setOpen} user_id={id} />
              {showTransactionHistory && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Wallet ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions
                        .slice() // Create a copy of the transactions array to avoid mutating the original array
                        .sort(
                          (a, b) =>
                            new Date(b.transaction_date) -
                            new Date(a.transaction_date)
                        )
                        .map((transaction) => (
                          <tr key={transaction.transaction_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {transaction.transaction_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.wallet_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  transaction.transaction_type === "withdrawal"
                                    ? "bg-red-100 text-red-600"
                                    : transaction.transaction_type === "deposit"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"
                                }`}
                              >
                                {transaction.transaction_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${parseFloat(transaction.amount).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(
                                transaction.transaction_date
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {user ? (
        <>
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
            User Profile
          </h1>
          <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                "Personal Information",
                "Change Password",
                "Verification Center",
                "Wallet Information",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="gap-6">{renderContent()}</div>
        </>
      ) : (
        <div className="text-gray-500 text-center mt-4">No user found</div>
      )}
    </div>
  );
};

export default UserInfo;
