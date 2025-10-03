import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import AdminDashboard from './pages/admin-dashboard';
import AdminStudents from './pages/admin-students';
import AdminMentors from './pages/admin-mentors';
import StudentProfile from './pages/student-profile';
import MentorDashboard from './pages/mentor-dashboard';
import MentorStudents from './pages/mentor-students';
import AdminConfiguration from './pages/admin-configuration';
import UserRegistration from './pages/user-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-students" element={<AdminStudents />} />
        <Route path="/admin-mentors" element={<AdminMentors />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
        <Route path="/mentor-students" element={<MentorStudents />} />
        <Route path="/admin-configuration" element={<AdminConfiguration />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
