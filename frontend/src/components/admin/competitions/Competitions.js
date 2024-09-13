import React, { useState, useEffect } from "react";
import CompetitionDrawer from "./CompetitionDrawer";
import {
  fetchAllCompetitions,
  deleteCompetition,
} from "../../../actions/competitions";
import { useSelector, useDispatch } from "react-redux";
import Competition from "./Competition";

const Competitions = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [competitionToDelete, setCompetitionToDelete] = useState(null);
  const { competitions } = useSelector((state) => state.competitions);

  useEffect(() => {
    dispatch(fetchAllCompetitions());
  }, [dispatch, open, reload]);

  const sortedCompetitions = competitions
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const filteredCompetitions = sortedCompetitions.filter((competition) =>
    filterStatus === "all" ? true : competition.status === filterStatus
  );

  const handleDeleteClick = (competition) => {
    setCompetitionToDelete(competition);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCompetition(competitionToDelete.competition_id));
    setDeleteConfirmationOpen(false);
    setCompetitionToDelete(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Competitions</h1>
          <button
            onClick={() => setOpen(!open)}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Create Competition
          </button>
        </div>

        {/* Filter dropdown */}
        <div className="mb-6 flex items-center">
          <label
            htmlFor="status-filter"
            className="mr-3 font-semibold text-gray-700"
          >
            Filter by Status:
          </label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        {/* Competitions list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .map((competition) => (
              <div
                key={competition.competition_id}
                className="bg-white p-5 shadow-lg rounded-lg border border-gray-200"
              >
                <Competition
                  competition={competition}
                  setReload={() => setReload(!reload)}
                />
                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      competition.status === "active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {competition.status}
                  </span>
                  <button
                    onClick={() => handleDeleteClick(competition)}
                    className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <CompetitionDrawer open={open} setOpen={setOpen} />

      {/* Delete Confirmation Modal */}
      {deleteConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600">
              Are you sure you want to delete the competition{" "}
              <strong>{competitionToDelete?.name}</strong>?
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDeleteConfirmationOpen(false)}
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-3 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
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

export default Competitions;
