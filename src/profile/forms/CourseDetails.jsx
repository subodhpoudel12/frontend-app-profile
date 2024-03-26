import React, { useState, useEffect } from 'react';
import {
  getAuthenticatedHttpClient as getHttpClient,
} from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import RegisterOrganization from './RegisterOrganization';

const CourseDetails = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { results } } = await getHttpClient().get(`${getConfig().LMS_BASE_URL}/api/organizations/v0/organizations/`);
        setOrganizationData(results);
        // Destructuring the results object to access properties
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log('organizations data', organizationData);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <RegisterOrganization organizationData={organizationData} />
    </div>
  );
};

export default CourseDetails;
