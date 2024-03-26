import React, { useState, useEffect } from 'react';
import './RegisterOrganization.css';
import { getConfig } from '@edx/frontend-platform';
import {
  getAuthenticatedHttpClient as getHttpClient,
} from '@edx/frontend-platform/auth';

const RegisterOrganization = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    organizationCode: '',
    province: '',
    district: '',
    localLevel: '',
    wardNo: '',
    tole: '',
    contactNo: '',
    contactPerson: '',
    website: '',
    organizationType: '',
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedOrganization = organizationData.find(org => org.name === value);
    setFormData({
      ...formData,
      [name]: value,
      shortName: selectedOrganization.short_name,
      description: selectedOrganization.description,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8080/organization/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to register organization');
      }
      // Handle success
    } catch (err) {
      // Handle error
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register Organization</h2>
        <div className="form-group">
          <label htmlFor="organizationName">Organization Name:</label>
          <select id="organizationName" name="organizationName" onChange={handleChange} required>
            <option value=""> Select the Organization </option>
            {organizationData && organizationData.map((org) => (
              <option key={org.name} value={org.name}>
                {org.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Organization Email:</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="organizationCode">Organization Code:</label>
          <input type="text" id="organizationCode" name="organizationCode" value={formData.shortName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="province">Province:</label>
          <input type="text" id="province" name="province" value={formData.province} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="district">District:</label>
          <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="localLevel">Local Level:</label>
          <input type="text" id="localLevel" name="localLevel" value={formData.localLevel} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="wardNo">Ward No.:</label>
          <input type="text" id="wardNo" name="wardNo" value={formData.wardNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="tole">Tole:</label>
          <input type="text" id="tole" name="tole" value={formData.tole} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="contactNo">Contact No.:</label>
          <input type="text" id="contactNo" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person:</label>
          <input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="website">Organization URL (website):</label>
          <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="organizationType">Organization Type:</label>
          <input type="text" id="organizationType" name="organizationType" value={formData.description} onChange={handleChange} required />
        </div>
        <input type="submit" className="button" value="Register" />
      </form>
    </div>
  );
};

export default RegisterOrganization;
