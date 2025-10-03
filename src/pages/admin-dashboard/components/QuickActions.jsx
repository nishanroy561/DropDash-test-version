import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'System Configuration',
      description: 'Manage risk thresholds and alert settings',
      icon: 'Settings',
      color: 'bg-blue-50 text-blue-600',
      onClick: () => navigate('/admin-configuration')
    },
    {
      title: 'Export Data',
      description: 'Download student analytics reports',
      icon: 'Download',
      color: 'bg-green-50 text-green-600',
      onClick: () => {
        // Mock export functionality
        const csvContent = "data:text/csv;charset=utf-8,Name,Class,Risk Level,Attendance\nRavi Sharma,Class 10-A,High,65%\nAnjali Verma,Class 9-B,Low,92%";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link?.setAttribute("href", encodedUri);
        link?.setAttribute("download", "student_analytics_report.csv");
        document.body?.appendChild(link);
        link?.click();
        document.body?.removeChild(link);
      }
    },
    {
      title: 'Add New Student',
      description: 'Register a new student in the system',
      icon: 'UserPlus',
      color: 'bg-purple-50 text-purple-600',
      onClick: () => {
        // Mock add student functionality
        alert('Add Student functionality would open a modal or navigate to a form');
      }
    },
    {
      title: 'Send Notifications',
      description: 'Broadcast alerts to mentors and students',
      icon: 'Bell',
      color: 'bg-amber-50 text-amber-600',
      onClick: () => {
        // Mock notification functionality
        alert('Notification system would open here');
      }
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action, index) => (
          <button
            key={index}
            onClick={action?.onClick}
            className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-smooth text-left group"
          >
            <div className={`w-10 h-10 rounded-lg ${action?.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <Icon name={action?.icon} size={20} />
            </div>
            
            <h4 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-smooth">
              {action?.title}
            </h4>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;