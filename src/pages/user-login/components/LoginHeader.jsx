import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-12">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="GraduationCap" size={28} color="white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">DropoutDash</h1>
      </div>

      {/* Tagline */}
      <p className="text-lg text-gray-600 max-w-md mx-auto">
        AI-powered educational analytics for proactive student support
      </p>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Icon name="TrendingUp" size={16} color="#2563EB" />
          <span>Risk Analytics</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Icon name="Users" size={16} color="#2563EB" />
          <span>Student Mentoring</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Icon name="BarChart3" size={16} color="#2563EB" />
          <span>Early Intervention</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;