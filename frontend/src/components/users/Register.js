import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signupUser } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import SuccessAlert from '../../BaseFiles/SuccessAlert'
import ErrorAlert from '../../BaseFiles/ErrorAlert'
import { clearErrors, clearMessage } from "../../redux/authSlice";
import {useNavigate} from 'react-router-dom'
const FormRegistration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false);
  const {error, message} = useSelector((state)=>state.auth)
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .required("First name is required"),
      last_name: Yup.string()
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number is not valid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    }),
    onSubmit: (values) => {
      dispatch(signupUser(values))
    },
  });

  useEffect(()=>{
    if(message){
      setTimeout(()=>{
        dispatch(clearMessage())
        navigate('/')
      }, 5000)
    }
    if(error){
      setTimeout(()=>{
        dispatch(clearErrors())

      }, 5000)
    }
  }, [message, error])

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
          Register for a free account
        </h1>
        <div className="w-full mt-8">
          <form onSubmit={formik.handleSubmit} className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <input
                  name="first_name"
                  className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Your first name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.first_name}</p>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  name="last_name"
                  className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Your last name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.last_name}</p>
                ) : null}
              </div>
            </div>
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
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="w-full">
              <input
                name="phone"
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="tel"
                placeholder="Enter your phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
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
                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
              ) : null}
            </div>
            {error && <ErrorAlert error={error} />}
            {message && <SuccessAlert message={message} />}
            <button
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
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
              <span className="ml-3">Register</span>
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <a href="">
                <span className="text-[#E9522C] font-semibold">Login</span>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegistration;
