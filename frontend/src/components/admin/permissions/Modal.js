import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPermissions, addPermissions } from '../../../actions/permissions';

const PermissionsComponent = () => {
  const dispatch = useDispatch();
  const { permissions, loading, error } = useSelector((state) => state.permissions);
  const [roleId, setRoleId] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  React.useEffect(() => {
    dispatch(fetchAllPermissions());
  }, [dispatch]);

  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions((prevSelected) =>
      prevSelected.includes(permissionId)
        ? prevSelected.filter((id) => id !== permissionId)
        : [...prevSelected, permissionId]
    );
  };

  const handleAddPermissions = () => {
    if (roleId && selectedPermissions.length > 0) {
      dispatch(addPermissions({ roleId, permissionIds: selectedPermissions }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Permissions</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleId">
          Role ID
        </label>
        <input
          type="text"
          id="roleId"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Select Permissions</h3>
        {permissions.map((perm) => (
          <div key={perm.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`perm-${perm.id}`}
              onChange={() => handleCheckboxChange(perm.id)}
              className="mr-2 leading-tight"
            />
            <label htmlFor={`perm-${perm.id}`} className="text-gray-700">
              {perm.name}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddPermissions}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Permissions
      </button>
    </div>
  );
};

export default PermissionsComponent;


