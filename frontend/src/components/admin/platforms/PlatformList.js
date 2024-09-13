import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePlatform, fetchAllPlatforms } from '../../../actions/platform'; // Adjust the import path as needed

const PlatformList = () => {
  const dispatch = useDispatch();
  const { platforms, loading, error } = useSelector((state) => state.platforms);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPlatformId, setSelectedPlatformId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedPlatformId(id);
    setIsDeleting(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPlatformId) {
      dispatch(deletePlatform(selectedPlatformId));
      setSelectedPlatformId(null);
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedPlatformId(null);
    setIsDeleting(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Platforms</h2>

      {/* Display loading state */}
      {loading && (
        <p className="text-center text-blue-500">Loading platforms...</p>
      )}

      {/* Display error message if there's an error */}
      {error && (
        <p className="text-center text-red-500">
          Failed to load platforms: {error}
        </p>
      )}

      {/* Display the list of platforms in a table */}
      {!loading && platforms.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Password
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Server Configuration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {platforms.map((platform) => (
                <tr key={platform.platform_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {platform.platform_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {platform.manager_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="text"
                      value={platform.password}
                      readOnly
                      className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {platform.server_config}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {platform.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleDeleteClick(platform.platform_id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display message if no platforms found */}
      {!loading && platforms.length === 0 && (
        <p className="text-center text-gray-500">
          No platforms available
        </p>
      )}

      {/* Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this platform?</p>
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
  );
};

export default PlatformList;
