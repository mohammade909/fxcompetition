import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../BaseFiles/Spinner";
import { clearErrors } from "../../redux/authSlice";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const { loading, auth, err, message } = useSelector((state) => state.auth); // Adjust this based on your state structure
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (auth === null) {
      navigate("/admin/login");
    } else {
      navigate(`/admin/dashboard/`);
    }
  }, [err, dispatch, auth]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
      <div className="flex flex-col items-end justify-start overflow-hidden mb-2 xl:max-w-3xl w-full">
        <div className="flex">
          <h3 className="text-white">Dark Mode : &nbsp;</h3>
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              readOnly
            />
            <div
              onClick={() => setDarkMode(!darkMode)}
              className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
          </label>
        </div>
      </div>
      <div
        className={`xl:max-w-3xl ${
          darkMode ? "bg-black" : "bg-white"
        } w-full p-5 sm:p-10 rounded-md`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Welcome Back Admin
        </h1>
        <div className="w-full mt-8">
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4"
          >
            <div className="w-full">
              <input
                name="email"
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <div className="w-full">
              <input
                name="password"
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            {err && <ErrorAlert error={err} />}
            <button
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              disabled={loading}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Login</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
