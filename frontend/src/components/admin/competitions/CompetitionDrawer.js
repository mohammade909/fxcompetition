import React from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createCompetition } from "../../../actions/competitions";
import { useDispatch } from "react-redux";

const CompetitionDrawer = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    start_date: Yup.date().required("Required"),
    end_date: Yup.date()
      .required("Required")
      .min(Yup.ref('start_date'), "End date must be later than start date"),
    level_required: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    created_by: Yup.string().required("Required"),
  });

  const initialValues = {
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    level_required: "",
    status: "",
    created_by: "",
  };

  const onSubmit = (values) => {
    dispatch(createCompetition(values));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                              Create Competition
                            </DialogTitle>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="relative text-gray-400 hover:text-gray-500"
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 py-6 sm:space-y-0 sm:py-0">
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Name
                          </label>
                          <div className="sm:col-span-2">
                            <Field
                              id="name"
                              name="name"
                              type="text"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Description
                          </label>
                          <div className="sm:col-span-2">
                            <Field
                              id="description"
                              name="description"
                              as="textarea"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="start_date"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Start Date
                          </label>
                          <div className="sm:col-span-2">
                            <Field
                              id="start_date"
                              name="start_date"
                              type="date"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage
                              name="start_date"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="end_date"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            End Date
                          </label>
                          <div className="sm:col-span-2">
                            <Field
                              id="end_date"
                              name="end_date"
                              type="date"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage
                              name="end_date"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="level_required"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Level Required
                          </label>
                          <div className="sm:col-span-2">
                            <Field
                              id="level_required"
                              name="level_required"
                              as="select"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                            >
                              <option value="">Select level</option>
                              <option value="1">Beginner</option>
                              <option value="2">Intermediate</option>
                              <option value="3">Advanced</option>
                              <option value="4">Expert</option>
                              
                            </Field>
                            <ErrorMessage
                              name="level_required"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Status
                          </label>
                          <div className="sm:col-span-2">
                            <Field
                              id="status"
                              name="status"
                              as="select"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                            >
                              <option value="">Select status</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="scheduled">scheduled</option>
                            s
                            </Field>
                            <ErrorMessage
                              name="status"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>


                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="created_by"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Created By
                          </label>
                          <div className="sm:col-span-2">
                            <Field
                              id="created_by"
                              name="created_by"
                              type="text"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage
                              name="created_by"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 px-4 py-4 flex justify-end gap-x-2">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-3.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-md border border-transparent bg-teal-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-teal-400 hover:ring-teal-600"
                      >
                        Save
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CompetitionDrawer;
