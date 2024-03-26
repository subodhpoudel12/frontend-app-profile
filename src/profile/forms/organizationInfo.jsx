import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CourseDetails from './CourseDetails';

const OrganizationInfo = ({ username }) => {
  const [organizationData, setOrganizationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudentInfo() {
      try {
        const response = await fetch('http://127.0.0.1:8080/organization/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          const errorMessage = `Failed to fetch student information: ${response.statusText}`;
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setOrganizationData(data);
      } catch (err) {
        setError(err);
      }
    }
    fetchStudentInfo();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        organizationData && organizationData
          .map((organization) => (
            <div key={organization.id}>
              <h5>Full Name</h5>
              <p>{username}</p>
              <h5>Email</h5>
              <p>{organization.email}</p>
              <h5>Organization Name</h5>
              <p>{organization.organizationName}</p>
              <h5>Organization Code</h5>
              <p>{organization.organizationCode}</p>
            </div>
          ))
      )}
      <CourseDetails />
    </div>
  );
};

OrganizationInfo.propTypes = {
  username: PropTypes.string.isRequired,
};

export default OrganizationInfo;
