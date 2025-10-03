import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/user-login')}
          className="flex items-center space-x-2 text-primary hover:text-accent transition-smooth"
        >
          <Icon name="GraduationCap" size={32} />
          <span className="text-2xl font-semibold">DropoutDash</span>
        </button>

        <div className="hidden sm:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Icon name="Users" size={16} />
            <span className="text-sm">Join 10,000+ educators</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Icon name="TrendingUp" size={16} />
            <span className="text-sm">Improve student outcomes</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Start Your Educational Analytics Journey
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of educators using AI-powered insights to identify at-risk students 
          and improve academic outcomes through proactive intervention.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="BarChart3" size={24} className="text-primary" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Real-time Analytics</h3>
          <p className="text-sm text-gray-600">Track student progress with live dashboards</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="AlertTriangle" size={24} className="text-primary" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Early Warning System</h3>
          <p className="text-sm text-gray-600">Identify at-risk students before it's too late</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Users" size={24} className="text-primary" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Collaborative Support</h3>
          <p className="text-sm text-gray-600">Connect mentors with students seamlessly</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;