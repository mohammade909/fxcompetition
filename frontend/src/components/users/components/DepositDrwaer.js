'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { depositMoney } from '../../../actions/wallet';

export default function DepositDrawer({ open, setOpen }) {
  const { auth } = useSelector((state) => state.auth);
  const { loading, error, message } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required('Amount is required')
        .min(1, 'Amount must be at least 1'),
    }),
    onSubmit: (values) => {
      dispatch(depositMoney({ user_id: auth.user_id, amount: values.amount }));
    },
  });

  // Effect to clear errors on close
  useEffect(() => {
    if (!open) {
      formik.setErrors({});
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <div className="fixed inset-0" aria-hidden="true" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel className="pointer-events-auto w-screen max-w-lg transform transition duration-500 ease-in-out sm:duration-700">
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Deposit Balance
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
                      {/* Amount */}
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                          Amount to Deposit
                        </label>
                        <input
                          id="amount"
                          name="amount"
                          type="number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.amount}
                          className={`mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            formik.touched.amount && formik.errors.amount
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                        {formik.touched.amount && formik.errors.amount ? (
                          <p className="mt-2 text-sm text-red-600">
                            {formik.errors.amount}
                          </p>
                        ) : null}
                        {error && (
                          <p className="mt-2 text-sm text-red-600">
                            {error}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={loading}
                          className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                            loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          {loading ? 'Processing...' : 'Pay Now'}
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
