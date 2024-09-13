"use client";

import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { Switch } from "@headlessui/react";
import { toast } from "react-toastify";
import { BASEURL } from "../../baseurl";

const ShutdownForm = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(`${BASEURL}/api/v1/auth/status`);
        const data = await response.json();

        if (response.ok) {
          setStatus(data.shutdown?.status === 1);
        } else {
          toast.error("Failed to fetch server status");
        }
      } catch (error) {
        console.error("Error fetching server status:", error);
      }
    };

    checkServerStatus();
  }, []);

  const updateServerStatus = async (newStatus, message) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/auth/shutdown`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus ? 1 : 0, message }),
      });

      if (response.ok) {
        toast.success("Server status updated successfully");
        setStatus(newStatus);
      } else {
        toast.error("Failed to update server status");
      }
    } catch (error) {
      toast.error("Error updating server status");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{ status: status, message: "" }}
        enableReinitialize
        onSubmit={async (values) => {}}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="space-y-4 grid grid-cols-3 justify-between items-center">
              <div className="flex items-center space-x-4">
                <label htmlFor="status" className="text-lg font-medium">
                  Shutdown Server:
                </label>
                <Field name="status">
                  {({ field }) => (
                    <Switch
                      checked={values.status}
                      onChange={(value) => {
                        setFieldValue("status", value);
                        updateServerStatus(value, values.message);
                      }}
                      className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
                    >
                      <span className="sr-only">Use setting</span>
                      <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
                        >
                          <svg
                            fill="none"
                            viewBox="0 0 12 12"
                            className="h-3 w-3 text-gray-400"
                          >
                            <path
                              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
                        >
                          <svg
                            fill="currentColor"
                            viewBox="0 0 12 12"
                            className="h-3 w-3 text-indigo-600"
                          >
                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                          </svg>
                        </span>
                      </span>
                    </Switch>
                  )}
                </Field>
              </div>
              <div className="mb-4 col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message:
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter shutdown message"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ShutdownForm;
