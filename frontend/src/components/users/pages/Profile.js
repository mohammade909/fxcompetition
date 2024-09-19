import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUser } from "../../../actions/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  // Get user details from Redux state
  const user = useSelector((state) => state.auth.auth);

  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Formik setup for form handling and validation
  const formik = useFormik({
    initialValues: {
      username: user.username || "",
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      dispatch(updateUser({ userId: user.user_id, updatedData: values }));
      setIsEditing(false); // Close the form after submission
    },
  });

  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-10 z-0 bg-opacity-5  p-6 rounded-lg overflow-hidden">
      {/* Profile Picture Section */}
      <div className="w-full md:w-1/3 h-80 flex bg-opacity-5  items-center justify-center">
        <img
          src={user.profilePicture || "/user_profile.png"}
          alt="User Avatar"
          className="w-64 h-64 object-cover rounded-md bg-white bg-opacity-10 backdrop-blur-md"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 w-full md:w-2/3 p-6">
        <h2 className="text-2xl font-semibold mb-6">
          {isEditing ? "Edit Profile" : "Profile Details"}
        </h2>

        {isEditing ? (
          // Show form if in editing mode
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className={`mt-1 block w-full border-gray-300 rounded-md p-2 shadow-custom ${
                    formik.errors.username && formik.touched.username
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.errors.username && formik.touched.username ? (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.username}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`mt-1 block w-full border-gray-300 rounded-md p-2 shadow-custom ${
                    formik.errors.email && formik.touched.email
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                  className={`mt-1 block w-full border-gray-300 rounded-md p-2 shadow-custom ${
                    formik.errors.first_name && formik.touched.first_name
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.errors.first_name && formik.touched.first_name ? (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.first_name}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                  className={`mt-1 block w-full border-gray-300 rounded-md p-2 shadow-custom ${
                    formik.errors.last_name && formik.touched.last_name
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.errors.last_name && formik.touched.last_name ? (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.last_name}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="submit"
                className="w-full mt-2 bg-[#D3BDF0] text-gray-500 py-2 px-4 rounded-md p-3 hover:bg-[#e2d1f8] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full mt-2 bg-[#82A6F3] text-gray-700 py-2 px-4 rounded-md p-3 hover:bg-[#82a6f35f] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // Show profile details if not in editing mode
          <div className="space-y-4">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>First Name:</strong> {user.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {user.last_name}
            </p>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full mt-2 bg-[#D3BDF0] text-gray-500 py-2 px-4 rounded-md p-3 hover:bg-[#e2d1f8] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
