"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getWalletBalance } from "../../../actions/wallet";
import {createAccount } from "../../../actions/accounts";
import { useDispatch, useSelector } from "react-redux";

export default function AccountDrawer({ open, setOpen }) {
  const { balance } = useSelector((state) => state.wallet);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Formik setup
  useEffect(() => {
    dispatch(getWalletBalance(auth.user_id));
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      trader_id: auth.user_id,
      account_type: "live",
      initial_deposit: "",
      currency: "USD", // Default currency
      leverage: "",
      is_demo: 0
    },
    validationSchema: Yup.object({
      initial_deposit: Yup.number()
        .required("Initial deposit is required")
        .min(0, "Initial deposit must be at least 0"),
      currency: Yup.string().required("Currency is required"),
      leverage: Yup.number()
        .required("Leverage is required")
        .min(1, "Leverage must be at least 1"),
    }),
    onSubmit: (values) => {
      if(values.balance > balance || values.initial_deposit > balance){
        alert("Insufficient balance for create a new account");
        return;
      }
      // Handle form submission 
      dispatch(createAccount(values));
      setOpen(false)
     // Close the drawer after successful submission 
      console.log(values);
      // Add your submit logic here, such as API call to create an account
    },
  });

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out sm:duration-700">
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Create Account
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-6">
                      {/* Balance */}
                     
                      {/* Initial Deposit */}
                      <div>
                        <label
                          htmlFor="initial_deposit"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Amount Deposit
                        </label>
                        <input
                          id="initial_deposit"
                          name="initial_deposit"
                          type="number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.initial_deposit}
                          className={`mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            formik.touched.initial_deposit &&
                            formik.errors.initial_deposit
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {formik.touched.initial_deposit &&
                        formik.errors.initial_deposit ? (
                          <p className="mt-2 text-sm text-red-600">
                            {formik.errors.initial_deposit}
                          </p>
                        ) : null}
                      </div>

                      {/* Currency */}
                      <div>
                        <label
                          htmlFor="currency"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Currency
                        </label>
                        <select
                          id="currency"
                          name="currency"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.currency}
                          className={`mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            formik.touched.currency && formik.errors.currency
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="JPY">JPY</option>
                          {/* Add more currency options as needed */}
                        </select>
                        {formik.touched.currency && formik.errors.currency ? (
                          <p className="mt-2 text-sm text-red-600">
                            {formik.errors.currency}
                          </p>
                        ) : null}
                      </div>

                      {/* Leverage */}
                      <div>
                        <label
                          htmlFor="leverage"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Leverage
                        </label>
                        <input
                          id="leverage"
                          name="leverage"
                          type="number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.leverage}
                          className={`mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            formik.touched.leverage && formik.errors.leverage
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {formik.touched.leverage && formik.errors.leverage ? (
                          <p className="mt-2 text-sm text-red-600">
                            {formik.errors.leverage}
                          </p>
                        ) : null}
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Create Account
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
