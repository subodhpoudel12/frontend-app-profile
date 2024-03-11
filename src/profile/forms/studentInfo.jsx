import React, { useState, useEffect } from 'react';

const StudentInfo = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudentInfo() {
      try {
        const response = await fetch('http://127.0.0.1:8080/student/', {
          method: 'GET',
          headers: {
            Accept: 'application/json', // Removed unnecessary quotes
            'X-CSRFToken': 'Q1MIbv3Y34bhqGRmWK5kZ9c2FuAkAUy7KG8Q13Tf62fB5ufKNkFXY8YBsgQtbYMQ', // Ensure CSRF token is correct
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
        studentData && studentData.map((student) => (
          <div key={student.id}>
            <h2>Student Information</h2>
            <p>Email: {student.email}</p>
            <p>Full name: {student.fullName}</p>
            <p>District: {student.district}</p>
            <p>Local Level: {student.localLevel}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentInfo;
