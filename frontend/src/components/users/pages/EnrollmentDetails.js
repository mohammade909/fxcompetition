import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEnrollmentsByUserId } from '../../../actions/enrollment';

const EnrollmentDetails = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { enrollments } = useSelector((state) => state.enrollments);

  useEffect(() => {
    if (auth.user_id) {
      dispatch(getEnrollmentsByUserId(auth.user_id));
    }
  }, [dispatch, auth.user_id]);
  const levels = ["beginner", "intermediate", "advanced", "expert"];
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Enrollment Details</h1>
      {enrollments.length === 0 ? (
        <p className="text-gray-500">No enrollment details available.</p>
      ) : (
        <div className="overflow-x-hidden">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competition Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.enrollment_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{enrollment.competition_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(enrollment.enrollment_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(enrollment.start_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(enrollment.end_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.level_required}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrollmentDetails;
