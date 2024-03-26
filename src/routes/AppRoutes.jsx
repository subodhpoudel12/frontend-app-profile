import React from 'react';
import {
  AuthenticatedPageRoute,
  PageWrap,
} from '@edx/frontend-platform/react';
import { Routes, Route } from 'react-router-dom';
import { ProfilePage, NotFoundPage } from '../profile';
import RegisterOrganization from '../profile/forms/RegisterOrganization';
import StudentRegistration from '../profile/forms/RegisterStudent';
import EnrollmentInfo from '../profile/forms/EnrollmentInfo';

const AppRoutes = () => (
  <Routes>
    <Route path="/user-enrollments" element={<AuthenticatedPageRoute><EnrollmentInfo /></AuthenticatedPageRoute>} />
    <Route path="/student-register/:username" element={<AuthenticatedPageRoute><StudentRegistration /></AuthenticatedPageRoute>} />
    <Route path="/organization-register/:username" element={<AuthenticatedPageRoute><RegisterOrganization /></AuthenticatedPageRoute>} />
    <Route path="/u/:username" element={<AuthenticatedPageRoute><ProfilePage /></AuthenticatedPageRoute>} />
    <Route path="/notfound" element={<PageWrap><NotFoundPage /></PageWrap>} />
    <Route path="*" element={<PageWrap><NotFoundPage /></PageWrap>} />
  </Routes>
);

export default AppRoutes;
