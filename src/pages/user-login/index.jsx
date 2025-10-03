import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      // Redirect based on role
      switch (user?.role) {
        case 'admin': navigate('/admin-dashboard');
          break;
        case 'mentor': navigate('/mentor-dashboard');
          break;
        case 'student': navigate('/student-profile');
          break;
        default:
          navigate('/student-profile');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <LoginHeader />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <LoginForm />
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-8">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                © {new Date()?.getFullYear()} DropoutDash. All rights reserved.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-smooth">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-smooth">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLogin;