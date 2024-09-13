import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, updateUser } from '../../actions/user';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import {Link} from 'react-router-dom'
const projects = [
  { name: 'Graph API', initials: 'GA', href: '#', members: 16, bgColor: 'bg-green-100' , textColor:'text-green-800'},
  { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-100',  textColor:'text-purple-800' },
  { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-100',  textColor:'text-yellow-800' },
  { name: 'React Components', initials: 'RC', href: '#', members: 8, bgColor: 'bg-red-100', textColor:'text-red-800' },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Users() {
  const dispatch = useDispatch();
  const { users, status, error, totalPages, currentPage } = useSelector((state) => state.users);
  const token = 'your-jwt-token'; // Replace with your actual token

  const [page, setPage] = useState(1);
  const [updatedStatuses, setUpdatedStatuses] = useState({});

  useEffect(() => {
    dispatch(getUsers({ page, limit: 10, token }));
  }, [dispatch, page, token]);

  const handleStatusChange = (userId, key, value) => {
    setUpdatedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [userId]: {
        ...prevStatuses[userId],
        [key]: value,
      },
    }));
  };

  const handleSave = (userId) => {
    const updatedUser = updatedStatuses[userId];
    if (updatedUser) {
      dispatch(updateUser({ userId, updatedData: updatedUser }));
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const statusOptions = [
    { value: 'approved', label: 'Granted' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Suspended' },
  ];

  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-300 text-blue-900';
      case 'approved':
        return 'bg-green-300 text-green-900';
      case 'rejected':
        return 'bg-red-300 text-red-900';
      default:
        return '';
    }
  };

  const getUserStatus = (user, updatedStatuses, statusKey) =>
    updatedStatuses[user.user_id]?.[statusKey] || user[statusKey];

  return (
    <>
      <div className='px-6'>
      <h2 className="text-sm font-medium text-gray-500">Pinned Projects</h2>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {projects.map((project) => (
          <li key={project.name} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                project.bgColor,
                project.textColor,
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium',
              )}
            >
              {project.initials}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a href={project.href} className="font-medium text-gray-900 hover:text-gray-600">
                  {project.name}
                </a>
                <p className="text-gray-500">{project.members} Members</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className="mx-auto w-full px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">User Accounts</h2>
          <span className="text-xs text-gray-500">View accounts of registered users</span>
        </div>
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
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Joined</th>
                <th className="px-5 py-3">KYC Status</th>
                <th className="px-5 py-3">Login Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {users?.filter((item)=>item.user_type !=='admin').map((user) => (
                <tr key={user.user_id}>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-full w-full rounded-full" src={user.profile_image || "/default_user.png"} alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="whitespace-no-wrap">{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{user.email}</p>
                    <p className="whitespace-no-wrap">{user.phone}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{new Date(user.created_at).toLocaleDateString()}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <select
                      className={`rounded-md ${getStatusClasses(getUserStatus(user, updatedStatuses, 'kyc_status'))} px-3 py-2`}
                      value={getUserStatus(user, updatedStatuses, 'kyc_status')}
                      onChange={(e) => handleStatusChange(user.user_id, 'kyc_status', e.target.value)}
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
                      className={`rounded-md ${getStatusClasses(getUserStatus(user, updatedStatuses, 'login_status'))} px-3 py-2`}
                      value={getUserStatus(user, updatedStatuses, 'login_status')}
                      onChange={(e) => handleStatusChange(user.user_id, 'login_status', e.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border-b border-gray-200 bg-white py-5 text-sm">
                    <button
                      className="text-blue-600 text-xs mx-2 hover:text-blue-900"
                      onClick={() => handleSave(user.user_id)}
                    >
                      Save
                    </button>
                    <Link
                      to={`/admin/user/${user.user_id}`}
                      className="text-xs"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
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
    </>
  );
}
