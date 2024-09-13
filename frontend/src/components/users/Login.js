import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import { clearErrors } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/auth";
import Spinner from "../../BaseFiles/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { loading, err, auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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
      navigate("/");
    } else if (auth.user_type) {
      navigate(`/${auth.user_type}/dashboard`);
    }
  }, [err, dispatch, auth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Section (Form) */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-indigo-600">FundedNext</h2>
          </div>
          <form onClick={formik.handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                E-Mail
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                  {formik.errors.email}*
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="password"
                  type={showPass ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                  {formik.errors.password}*
                </p>
              )}
            </div>
            {err&& <ErrorAlert error={err} />}
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              type="submit"
            >
              {loading ? <Spinner /> : "Login"}
            </button>
           
            <div className="mt-4 flex justify-between text-sm">
              <Link to="#" className="text-indigo-600 hover:underline">
                Forgot Password?
              </Link>
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </div>
          </form>
        </div>

        {/* Right Section (Image and Text) */}
        <div className="w-full md:w-1/2 bg-indigo-600 text-white p-8 flex flex-col justify-center items-center md:items-start">
          <h3 className="text-2xl font-bold mb-4 text-center md:text-left">
            Track your trades on-the-go with easy dashboard access!
          </h3>
          <p className="text-lg text-center md:text-left">
            Your dashboard is just a few clicks away!
          </p>
          <img
            src="/dashboard_preview.png"
            alt="Dashboard preview"
            className="mt-8 rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
