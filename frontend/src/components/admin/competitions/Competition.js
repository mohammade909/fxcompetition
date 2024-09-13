import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import UpdateCompetitionDrawer from "./UpdateCompetitionDrawer";
import { Link } from "react-router-dom";
import SuccessModal from "../helperComponets/SuccessModal";

const CompetitionCard = ({ competition, setReload }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    name,
    description,
    start_date,
    end_date,
    level_required,
    status,
    created_by,
    created_at,
    updated_at,
    enrolled_users
  } = competition;

  const levelMap = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
    4: "Expert",
  };

  const stateReload = () => {
    setReload();
  };
  useEffect(() => {
    if (!isDrawerOpen) {
      stateReload();
    }
  }, [isDrawerOpen]);

  if (!competition) {
    return <h1>Loading...</h1>;
  }

  const filteredEnrolledUsers = enrolled_users?.filter(user => user !== null) || [];

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div>
            <p>
              <strong>Start Date:</strong>{" "}
              {start_date ? format(new Date(start_date), "MMM d, yyyy") : ""}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {end_date ? format(new Date(end_date), "MMM d, yyyy") : ""}
            </p>
          </div>
          <div>
            <p>
              <strong>Level:</strong> {levelMap[level_required]}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  status === "Active" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {status}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-2 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          <strong>Created By:</strong> User {created_by}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Created At:</strong>{" "}
          {created_at ? format(new Date(created_at), "MMM d, yyyy h:mm a") : ""}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Updated At:</strong>{" "}
          {updated_at ? format(new Date(updated_at), "MMM d, yyyy h:mm a") : ""}
        </p>
      </div>

      <h2 className="px-3 text-xl font-semibold text-gray-800 mb-2">Enrolled Users:{filteredEnrolledUsers.length}</h2>
      {/* Button to open the drawer */}
      <div className="p-4 flex justify-between ">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-600"
        >
          Edit
        </button>
        <Link
          to={`/admin/competitions/overview/${competition.competition_id}`}
          className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-600"
        >
          Details
        </Link>
      </div>
      

      {/* Update Competition Drawer */}
      {isDrawerOpen && (
        <UpdateCompetitionDrawer
          open={isDrawerOpen}
          setOpen={setIsDrawerOpen}
          competitionId={competition.competition_id}
        />
      )}
    </div>
  );
};

export default CompetitionCard;
