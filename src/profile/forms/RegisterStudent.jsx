import React, { useState, useEffect } from 'react';
import './StudentRegistration.css';
import { useParams } from 'react-router-dom';

const StudentRegistration = () => {
  const { username } = useParams();
  const [studentData, setStudentData] = useState({
    email: '',
    fullName: `${username}`,
    organization: '',
    fatherName: '',
    province: '',
    district: '',
    localLevel: '',
    wardNo: '',
    tole: '',
    guardianName: '',
    guardianPhoneNo: '',
    grade: '',
    section: '',
    rollNo: '',
  });
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/organization/');
      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }
      const data = await response.json();
      setOrganizations(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8080/student/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) {
        throw new Error('Failed to register student');
      }
      // Handle success, e.g., redirect to a different page
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="registration-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Registration</h2>
      {error && <p className="error-message">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={studentData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={studentData.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <select id="organization" name="organization" value={studentData.organization} onChange={handleChange} required>
            <option value="">Select Organization</option>
            {organizations.map(org => (
              <option key={org.id} value={org.id}>{org.organizationName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fatherName">Fathers Name:</label>
          <input type="text" id="fatherName" name="fatherName" value={studentData.fatherName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="province">Province:</label>
          <input type="text" id="province" name="province" value={studentData.province} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="district">District:</label>
          <input type="text" id="district" name="district" value={studentData.district} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="localLevel">Local Level:</label>
          <input type="text" id="localLevel" name="localLevel" value={studentData.localLevel} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="wardNo">Ward No.:</label>
          <input type="text" id="wardNo" name="wardNo" value={studentData.wardNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="tole">Tole:</label>
          <input type="text" id="tole" name="tole" value={studentData.tole} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="guardianName">Guardian Name:</label>
          <input type="text" id="guardianName" name="guardianName" value={studentData.guardianName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="guardianPhoneNo">Guardian Phone No.:</label>
          <input type="text" id="guardianPhoneNo" name="guardianPhoneNo" value={studentData.guardianPhoneNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input type="text" id="grade" name="grade" value={studentData.grade} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="section">Section:</label>
          <input type="text" id="section" name="section" value={studentData.section} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="rollNo">Roll No.:</label>
          <input type="text" id="rollNo" name="rollNo" value={studentData.rollNo} onChange={handleChange} required />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default StudentRegistration;
