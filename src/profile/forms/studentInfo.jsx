import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const StudentInfo = ({ username }) => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudentInfo() {
      try {
        const response = await fetch('http://127.0.0.1:8080/student/', {
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
        setStudentData(data);
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
        studentData && studentData
          .filter(student => student.fullName === username) // Filter data based on username
          .map((student) => (
            <div key={student.id}>
              <h5>Full Name</h5>
              <p>{username}</p>
              <h5>Email</h5>
              <p>{student.email}</p>
              <h5>Organization</h5>
              <p>{student.organization.organizationName}</p>
              <h5>Fathers Name</h5>
              <p>{student.fatherName}</p>
              <h5>Province</h5>
              <p>{student.province}</p>
              <h5>District</h5>
              <p>{student.district}</p>
              <h5>Local Level</h5>
              <p>{student.localLevel}</p>
              <h5>Ward No</h5>
              <p>{student.wardNo}</p>
              <h5>Tole</h5>
              <p>{student.tole}</p>
              <h5>Guardian Name</h5>
              <p>{student.guardianName}</p>
              <h5>Guardian Phone No</h5>
              <p>{student.guardianPhoneNo}</p>
              <h5>Grade</h5>
              <p>{student.grade}</p>
              <h5>Section</h5>
              <p>{student.section}</p>
              <h5>Roll No</h5>
              <p>{student.rollNo}</p>
            </div>
          ))
      )}
    </div>
  );
};

StudentInfo.propTypes = {
  username: PropTypes.string.isRequired,
};

export default StudentInfo;
