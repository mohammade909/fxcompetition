import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNotifications, deleteNotification, createNotification } from '../../../actions/notifications';
import { getUsers } from '../../../actions/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  message: Yup.string().required('Message is required'),
  users: Yup.array().of(Yup.number()).required('At least one user must be selected'),
});

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading: notificationsLoading, error: notificationsError } = useSelector((state) => state.notifications);
  const { users, loading: usersLoading, error: usersError } = useSelector((state) => state.users);
  const [showDrawer, setShowDrawer] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    dispatch(fetchAllNotifications());
    dispatch(getUsers(1, 20, 'hisdak'));
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteNotification(deleteId));
      toast.success("Notification deleted successfully");
    } catch (error) {
      toast.error("Error deleting notification");
    }
    setDeleteId(null);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      message: '',
      users: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(createNotification(values));
        console.log(values);
        
        toast.success("Notification created successfully");
        setShowDrawer(false);
        formik.resetForm();
      } catch (error) {
        toast.error("Error creating notification");
      }
    },
  });

  const handleUserChange = (userId) => {
    const { users } = formik.values;
    if (users?.includes(userId)) {
      formik.setFieldValue('users', users?.filter(id => id !== userId));
    } else {
      formik.setFieldValue('users', [...users, userId]);
    }
  };

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <button 
          className={`py-2 px-4 rounded ${activeTab === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => setActiveTab('list')}
        >
          List of Notifications
        </button>
        <button 
          className={`py-2 px-4 rounded ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => setActiveTab('create')}
        >
          Create Notification
        </button>
      </div>

      {activeTab === 'list' && (
        <>
          {notificationsLoading && <p>Loading notifications...</p>}
          {notificationsError && <p className="text-red-500">{notificationsError}</p>}
          
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Read Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications?.map((notification) => (
                <tr key={notification.id}>
                  <td className="py-2 px-4 border-b">{notification.title}</td>
                  <td className="py-2 px-4 border-b">{notification.message}</td>
                  <td className="py-2 px-4 border-b">{notification.read_status ? "Read" : "Unread"}</td>
                  <td className="py-2 px-4 border-b">
                    <button 
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => handleDelete(notification.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Confirmation Modal */}
          {deleteId && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded shadow-lg">
                <p className="text-lg mb-4">Are you sure you want to delete this notification?</p>
                <button 
                  className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                  onClick={confirmDelete}
                >
                  Yes
                </button>
                <button 
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setDeleteId(null)}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </>
      )}

{activeTab === 'create' && (
  <div className="flex">
    {/* Form Section */}
    <div className="w-2/3 p-4 bg-white rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4">Create Notification</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            id="title"
            name="title"
            type="text"
            {...formik.getFieldProps('title')}
            className="mt-1 block w-full border-gray-300 bg-slate-100 p-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea 
            id="message"
            name="message"
            {...formik.getFieldProps('message')}
            className="mt-1 block w-full border-gray-300 bg-slate-100 p-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {formik.touched.message && formik.errors.message ? (
            <p className="text-red-500 text-sm">{formik.errors.message}</p>
          ) : null}
        </div>
        <div className="flex justify-end space-x-2">
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Create
          </button>
          <button 
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={() => setShowDrawer(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    {/* Users List Section */}
    <div className="w-1/3 p-4 bg-gray-50 rounded shadow-lg ml-4">
      <h2 className="text-lg font-bold mb-4">Select Users</h2>
      {usersLoading ? (
        <p>Loading users...</p>
      ) : usersError ? (
        <p className="text-red-500">{usersError}</p>
      ) : (
        <div className="space-y-2">
          {users?.map((user) => (
            <div key={user.user_id} className="flex items-center">
              <input
                type="checkbox"
                id={`user-${user.user_id}`}
                value={user.user_id}
                checked={formik.values.users.includes(user.user_id)}
                onChange={() => handleUserChange(user.user_id)}
                className="mr-2"
              />
              <label htmlFor={`user-${user.user_id}`} className="text-sm text-gray-700">{user.email}</label>
            </div>
          ))}
        </div>
      )}
      {formik.touched.users && formik.errors.users ? (
        <p className="text-red-500 text-sm">{formik.errors.users}</p>
      ) : null}
    </div>
  </div>
)}

    </div>
  );
};

export default Notifications;
