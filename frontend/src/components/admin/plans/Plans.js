import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPlans,
  deletePlan,
  createPlan,
  updatePlan,
} from "../../../actions/plan";

const Plans = () => {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.plans);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [planToDelete, setPlanToDelete] = useState(null); // Manage active tab state
  const [planFormData, setPlanFormData] = useState({
    plan_name: "",
    price: "",
    duration: "",
    level: "",
    features: "",
  });

  const confirmDelete = () => {
    dispatch(deletePlan(planToDelete));
    window.location.reload();
    setIsModalOpen(false); // Close the modal after deletion
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setPlanToDelete(null); // Reset the selected plan for deletion
  };

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(
        updatePlan({ id: editingPlan.plan_id, updateData: planFormData })
      );
      window.location.reload();
    } else {
      dispatch(createPlan(planFormData));
      window.location.reload();
    }
    setActiveTab("list"); // Switch back to list after submit
    resetForm();
  };

  const resetForm = () => {
    setPlanFormData({
      plan_name: "",
      price: "",
      duration: "",
      level: "",
      features: "",
    });
    setIsEditMode(false);
    setEditingPlan(null);
  };

  const handleCreatePlan = () => {
    resetForm(); // Reset form for creating a new plan
    setActiveTab("create");
  };

  const handleEditPlan = (plan) => {
    setIsEditMode(true);
    setEditingPlan(plan);
    setPlanFormData({
      plan_name: plan.plan_name,
      price: plan.price,
      duration: plan.duration,
      level: plan.level,
      features: plan.features,
    });
    setActiveTab("create");
  };

  const handleDeletePlan = (planId) => {
    setPlanToDelete(planId);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Tabs */}
      <div className="mb-8">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          List Plans
        </button>
        <button
          onClick={handleCreatePlan}
          className={`ml-4 px-4 py-2 rounded-md ${
            activeTab === "create" && !isEditMode
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Create Plan
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "list" && (
        <div>
          <h1 className="text-3xl font-bold mb-4">List of Plans</h1>

          {/* Loading or Error Handling */}
          {loading && <p className="text-center">Loading plans...</p>}
          {error && (
            <p className="text-center text-red-500">
              Failed to load plans: {error}
            </p>
          )}

          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.length > 0 ? (
              plans.map((plan) => (
                <div
                  key={plan.plan_id}
                  className="bg-white shadow-md rounded-lg p-6"
                >
                  {/* Plan Details */}
                  <h2 className="text-xl font-semibold mb-2">
                    {plan.plan_name}
                  </h2>
                  <p className="text-gray-600 mb-4">Level: {plan.level}</p>

                  {/* Plan Price and Duration */}
                  <div className="mb-4">
                    <span className="text-lg font-bold">${plan.price}</span>
                    <span className="text-gray-600 ml-4">
                      Duration: {plan.duration} months
                    </span>
                  </div>

                  {/* Plan Features */}
                  <ul className="mb-4">
                    <li className="font-semibold">Features:</li>
                    {plan?.features &&
                      JSON.parse(plan.features).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>

                  {/* Timestamps */}
                  <div className="text-gray-500 text-sm">
                    <p>
                      Created: {new Date(plan.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      Updated: {new Date(plan.updated_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.plan_id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">No plans found.</p>
            )}
          </div>
        </div>
      )}

      {/* Create/Edit Plan Tab */}
      {activeTab === "create" && (
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {isEditMode ? "Update Plan" : "Create a New Plan"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="plan_name"
              >
                Plan Name
              </label>
              <input
                type="text"
                id="plan_name"
                name="plan_name"
                value={planFormData.plan_name}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={planFormData.price}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="duration"
              >
                Duration (months)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={planFormData.duration}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="level"
              >
                Level
              </label>
              <select
                id="level"
                name="level"
                value={planFormData.level}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
                required
              >
                <option value="" disabled>
                  Select a level
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="features"
              >
                Features (JSON format)
              </label>
              <textarea
                id="features"
                name="features"
                value={planFormData.features}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {isEditMode ? "Update Plan" : "Create Plan"}
            </button>
          </form>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this plan?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
