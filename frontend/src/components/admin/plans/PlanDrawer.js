import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPlan, updatePlan, getPlan } from "../../../actions/plan";

const PlanDrawer = ({ isOpen, onClose, planId, isEdit }) => {
  const dispatch = useDispatch();
  const { plan } = useSelector((state) => state.plans);
  // Log plan data to debug issues
  useEffect(() => {
    if (planId) {
      dispatch(getPlan(planId));
    }
  }, [planId]);

  // Initial values for Formik
  const initialValues = {
    plan_name: plan?.plan_name,
    level: plan?.level || "",
    price: plan?.price || "",
    duration: plan?.duration || "",
    features: plan?.features || "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    plan_name: Yup.string().required("Plan name is required"),
    level: Yup.string().required("Level is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be positive"),
    features: Yup.string().required("Features are required"),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    if (isEdit) {
      dispatch(updatePlan({ id: plan.plan_id, updateData: values }));
    } else {
      dispatch(createPlan(values));
    }
    onClose();
  };

  return (
    <div
      className={`fixed z-50 inset-0 flex items-start justify-end bg-gray-900 bg-opacity-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg h-full max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">
          {isEdit ? "Edit Plan" : "Create Plan"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="plan_name"
                className="block text-sm font-medium mb-2"
              >
                Plan Name
              </label>
              <Field
                id="plan_name"
                name="plan_name"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="plan_name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="level" className="block text-sm font-medium mb-2">
                Level
              </label>
              <Field
                as="select"
                id="level"
                name="level"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </Field>
              <ErrorMessage
                name="level"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Price
              </label>
              <Field
                id="price"
                name="price"
                type="number"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-sm font-medium mb-2"
              >
                Duration (months)
              </label>
              <Field
                id="duration"
                name="duration"
                type="number"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="duration"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="features"
                className="block text-sm font-medium mb-2"
              >
                Features
              </label>
              <Field
                id="features"
                name="features"
                as="textarea"
                rows="4"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="features"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isEdit ? "Update Plan" : "Create Plan"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PlanDrawer;
