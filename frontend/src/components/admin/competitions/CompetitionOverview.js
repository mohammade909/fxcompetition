import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompetitionDetails } from "../../../actions/competitions";
import {useParams} from 'react-router-dom'


const CompetitionOverview = () => {
    const { id } = useParams();
  const dispatch = useDispatch();
  const { competition, status, error } = useSelector((state) => state.competitions);

  useEffect(() => {
    dispatch(getCompetitionDetails(id));
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return competition ? (
    <div className="bg-white shadow-md rounded-lg p-6 my-6">
      {/* Competition Details */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{competition.name}</h2>
        <p className="text-gray-700 mb-4">{competition.description}</p>
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-semibold">Start Date:</span>{" "}
            {new Date(competition.start_date).toLocaleDateString()} at{" "}
            {new Date(competition.start_date).toLocaleTimeString()}
          </p>
          <p>
            <span className="font-semibold">End Date:</span>{" "}
            {new Date(competition.end_date).toLocaleDateString()} at{" "}
            {new Date(competition.end_date).toLocaleTimeString()}
          </p>
          <p>
            <span className="font-semibold">Level Required:</span>{" "}
            {competition.level_required}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`${
                competition.status === "active"
                  ? "text-green-600"
                  : competition.status === "inactive"
                  ? "text-gray-600"
                  : "text-yellow-600"
              }`}
            >
              {competition.status}
            </span>
          </p>
        </div>
      </div>

      {/* Enrollments */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Enrollments</h3>
        {competition.enrollments.length > 0 ? (
          <ul className="list-disc pl-5">
            {competition.enrollments.map((user) => (
              <li key={user.enrollment_id} className="mb-2">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src={user.user_image || "/default_user.png"}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{user.first_name} {user.last_name}</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No enrollments yet.</p>
        )}
      </div>
    </div>
  ) : (
    <p>No competition data available.</p>
  );
};

export default CompetitionOverview;
