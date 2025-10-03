import React from 'react';
import Icon from '../../../components/AppIcon';

const StudentHeader = ({ student }) => {
  const getRiskBadgeColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return 'CheckCircle';
      case 'medium':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student?.name}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1">
              <p className="text-gray-600 flex items-center">
                <Icon name="GraduationCap" size={16} className="mr-1" />
                Class {student?.class}
              </p>
              <p className="text-gray-600 flex items-center">
                <Icon name="UserCheck" size={16} className="mr-1" />
                Mentor: {student?.mentor}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-4 py-2 rounded-full border flex items-center space-x-2 ${getRiskBadgeColor(student?.riskLevel)}`}>
            <Icon name={getRiskIcon(student?.riskLevel)} size={16} />
            <span className="font-medium capitalize">{student?.riskLevel} Risk</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Student ID</p>
            <p className="font-medium text-gray-900">{student?.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;