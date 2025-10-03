import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = ({ userRole = 'admin', customBreadcrumbs = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbMap = {
    '/admin-dashboard': [
      { label: 'Dashboard', path: '/admin-dashboard', isActive: true }
    ],
    '/mentor-dashboard': [
      { label: 'Dashboard', path: '/mentor-dashboard', isActive: true }
    ],
    '/student-profile': [
      { label: userRole === 'student' ? 'My Profile' : 'Students', path: '/student-profile', isActive: true }
    ],
    '/admin-configuration': [
      { label: 'Dashboard', path: '/admin-dashboard', isActive: false },
      { label: 'Configuration', path: '/admin-configuration', isActive: true }
    ],
    '/user-registration': [
      { label: 'Registration', path: '/user-registration', isActive: true }
    ],
    '/user-login': [
      { label: 'Login', path: '/user-login', isActive: true }
    ]
  };

  const getBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }
    
    return breadcrumbMap?.[location?.pathname] || [
      { label: 'Dashboard', path: `/${userRole}-dashboard`, isActive: true }
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  const handleBreadcrumbClick = (path, isActive) => {
    if (!isActive) {
      navigate(path);
    }
  };

  if (breadcrumbs?.length <= 1 && breadcrumbs?.[0]?.isActive) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon name="ChevronRight" size={16} className="mx-2 text-gray-400" />
            )}
            {crumb?.isActive ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {crumb?.label}
              </span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(crumb?.path, crumb?.isActive)}
                className="text-gray-600 hover:text-primary transition-smooth font-medium"
              >
                {crumb?.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumb;