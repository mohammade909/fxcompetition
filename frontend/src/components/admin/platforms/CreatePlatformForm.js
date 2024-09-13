import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createPlatform } from '../../../actions/platform'; // Adjust the import path as needed
import SuccessAlert from '../../../BaseFiles/SuccessAlert';
import ErrorAlert from '../../../BaseFiles/ErrorAlert';
import { clearErrors ,clearMessage} from '../../../redux/platformSlice';
const CreatePlatformForm = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.platforms);

  const formik = useFormik({
    initialValues: {
      platform_name: '',
      manager_id: '',
      password: '',
      server_config: '',
      source: '',
    },
    validationSchema: Yup.object({
      platform_name: Yup.string().required('Required'),
      manager_id: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
      server_config: Yup.string().required('Required'),
      source: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(createPlatform(values));
    },
  });

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
        dispatch(clearMessage());
      }, 2000);
      return () => clearTimeout(timer); // Cleanup the timeout if component unmounts
    }
  }, [error, message, dispatch]);

  return (
    <>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <form onSubmit={formik.handleSubmit} className="space-y-6 max-w-3xl m-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700">Platform Name</label>
          <input
            type="text"
            name="platform_name"
            value={formik.values.platform_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 ${
              formik.errors.platform_name && formik.touched.platform_name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.errors.platform_name && formik.touched.platform_name && (
            <p className="text-red-500 text-sm">{formik.errors.platform_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Manager ID</label>
          <input
            type="text"
            name="manager_id"
            value={formik.values.manager_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 ${
              formik.errors.manager_id && formik.touched.manager_id ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.errors.manager_id && formik.touched.manager_id && (
            <p className="text-red-500 text-sm">{formik.errors.manager_id}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="text"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 ${
              formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Server Configuration</label>
          <input
            type="text"
            name="server_config"
            value={formik.values.server_config}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 ${
              formik.errors.server_config && formik.touched.server_config ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.errors.server_config && formik.touched.server_config && (
            <p className="text-red-500 text-sm">{formik.errors.server_config}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <input
            type="text"
            name="source"
            value={formik.values.source}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 ${
              formik.errors.source && formik.touched.source ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.errors.source && formik.touched.source && (
            <p className="text-red-500 text-sm">{formik.errors.source}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Platform
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePlatformForm;
