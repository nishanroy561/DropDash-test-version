import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedNavbar = ({ userRole = 'admin', userName = 'John Doe', isCollapsed = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // If there's an error parsing, redirect to login
        navigate('/user-login');
      }
    } else {
      // No user data found, redirect to login
      navigate('/user-login');
    }
  }, [navigate]);

  // Use stored user data if available, otherwise fallback to props
  const effectiveUserRole = currentUser?.role || userRole;
  const effectiveUserName = currentUser?.name || userName;

  const navigationItems = {
    admin: [
      { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
      { label: 'Students', path: '/admin-students', icon: 'Users' },
      { label: 'Configuration', path: '/admin-configuration', icon: 'Settings' },
      { label: 'Mentors', path: '/admin-mentors', icon: 'UserCheck' }
    ],
    mentor: [
      { label: 'Dashboard', path: '/mentor-dashboard', icon: 'LayoutDashboard' },
      { label: 'My Students', path: '/mentor-students', icon: 'Users' }
    ],
    student: [
      { label: 'My Profile', path: '/student-profile', icon: 'User' }
    ]
  };

  const currentNavItems = navigationItems?.[effectiveUserRole] || navigationItems?.student;

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    // Clear any other auth-related items if they exist
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    
    // Close dropdown
    setIsProfileDropdownOpen(false);
    
    // Reset current user state
    setCurrentUser(null);
    
    // Add a small delay to ensure state is updated before navigation
    setTimeout(() => {
      navigate('/user-login', { replace: true });
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef?.current && !profileDropdownRef?.current?.contains(event?.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (mobileMenuRef?.current && !mobileMenuRef?.current?.contains(event?.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Don't render navbar if no user data (prevents flash before redirect)
  if (!currentUser && !userRole) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b border-gray-200 h-16">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation(effectiveUserRole === 'student' ? '/student-profile' : `/${effectiveUserRole}-dashboard`)}
              className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">DropoutDash</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-white' :'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>

          {/* Profile Dropdown & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-smooth"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="hidden sm:block">{effectiveUserName}</span>
                <Icon name="ChevronDown" size={16} />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-modal border border-gray-200 py-1 z-[1010]">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{effectiveUserName}</p>
                    <p className="text-xs text-gray-500 capitalize">{effectiveUserRole}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleNavigation(effectiveUserRole === 'student' ? '/student-profile' : `/${effectiveUserRole}-dashboard`);
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-[1020]">
          <div className="absolute inset-0 bg-black bg-opacity-25" onClick={() => setIsMobileMenuOpen(false)} />
          <div ref={mobileMenuRef} className="absolute right-0 top-0 w-64 h-full bg-white shadow-modal">
            <div className="p-4 space-y-2">
              {currentNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-white' :'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default RoleBasedNavbar;