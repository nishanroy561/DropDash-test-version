import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'alert',
      title: 'High Risk Alert',
      description: 'Ravi Sharma marked as high risk due to low attendance (65%)',
      timestamp: '2 hours ago',
      icon: 'AlertTriangle',
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      type: 'update',
      title: 'Score Update',
      description: 'Anjali Verma scored 88% in recent assessment',
      timestamp: '4 hours ago',
      icon: 'TrendingUp',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'config',
      title: 'Configuration Changed',
      description: 'Attendance threshold updated to 75%',
      timestamp: '6 hours ago',
      icon: 'Settings',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 4,
      type: 'mentor',
      title: 'Mentor Note Added',
      description: 'Dr. Priya Singh added mentoring note for Vikram Kumar',
      timestamp: '8 hours ago',
      icon: 'MessageSquare',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 5,
      type: 'fee',
      title: 'Fee Payment Received',
      description: 'Sneha Reddy completed fee payment for October',
      timestamp: '1 day ago',
      icon: 'CreditCard',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 6,
      type: 'attendance',
      title: 'Attendance Alert',
      description: 'Amit Joshi absent for 3 consecutive days',
      timestamp: '1 day ago',
      icon: 'Calendar',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-smooth">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-smooth">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${activity?.bgColor} flex items-center justify-center`}>
              <Icon name={activity?.icon} size={16} className={activity?.iconColor} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {activity?.title}
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                {activity?.description}
              </p>
              <p className="text-xs text-gray-500">
                {activity?.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;