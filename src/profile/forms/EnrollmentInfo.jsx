import React, { useEffect, useState } from 'react';
import { getConfig } from '@edx/frontend-platform';
import {
  getAuthenticatedHttpClient as getHttpClient,
} from '@edx/frontend-platform/auth';

const EnrollmentInfo = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { results } } = await getHttpClient().get(`${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollments/`);
        setEnrollments(results);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {enrollments.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Course ID</th>
              <th>Is Active</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment}>
                <td>{enrollment.user}</td>
                <td>{enrollment.course_id}</td>
                <td>{enrollment.is_active ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EnrollmentInfo;
