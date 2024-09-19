import Header from "../components/Header";
import { useEffect, useState } from "react";
import {
  getAccountsByTraderId,
  deleteAccountById,
} from "../../../actions/accounts";
import { useDispatch, useSelector } from "react-redux";
import AccountDrawer from "../components/AccountDrawer";
export default function Accounts() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [entryId, setEntryId] = useState(null)
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { accounts, loading, success, error } = useSelector(
    (state) => state.accounts
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectEntry, setSelectEntry] = useState(null);
  useEffect(() => {
    dispatch(getAccountsByTraderId(auth.user_id));
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setSelectEntry(id);
    setIsDeleting(true);
  };

  const handleConfirmDelete = () => {
    if (selectEntry) {
      dispatch(deleteAccountById(selectEntry));
      setSelectEntry(null);
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectEntry(null);
    setIsDeleting(false);
  };
  const handleShow= (id) => {
    setShow(!show);
    setEntryId(id);
  }
  return (
    <div className="px-6">
      <Header />
      <div className="max-w-6xl mx-auto mt-10 bg-opacity-5   rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Accounts</h2>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="bg-green-500 text-white  px-4 py-2 rounded  hover:bg-green-600"
          >
            Create Account
          </button>
        </div>
        {/* Display loading state */}
        {loading && (
          <p className="text-center text-blue-500">Loading brokers...</p>
        )}

        {/* Display error message if there's an error */}
        {error && (
          <p className="text-center text-red-500">
            Failed to load brokers: {error}
          </p>
        )}

        {/* Display the list of brokers in a table */}
        {!loading && accounts.length > 0 && ( 
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y  divide-gray-200">
              <thead className="bg-gray-50 ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Account Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Password
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Account Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Currency
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr key={account.account_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {account.account_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input type={show && entryId === account.account_id ? 'text':'password'} value={account.password} disabled/>
                       <button onClick={()=>handleShow(account.account_id )}>{show && entryId === account.account_id ? 'Hide':'Show'}</button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.balance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.account_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-center">
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.currency}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDeleteClick(account.account_id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <AccountDrawer open={open} setOpen={setOpen} />
  
        {/* Display message if no brokers found */}
        {!loading && accounts.length === 0 && (
          <p className="text-center text-gray-500">No Account available</p>
        )}

        {/* Confirmation Modal */}
        {isDeleting && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-4">
                Are you sure you want to delete this account?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="ml-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
