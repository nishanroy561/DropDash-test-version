import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'note':
        return 'MessageSquare';
      case 'meeting':
        return 'Video';
      case 'alert':
        return 'AlertTriangle';
      case 'improvement':
        return 'TrendingUp';
      case 'absence':
        return 'UserX';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'note':
        return 'text-blue-600 bg-blue-100';
      case 'meeting':
        return 'text-green-600 bg-green-100';
      case 'alert':
        return 'text-red-600 bg-red-100';
      case 'improvement':
        return 'text-emerald-600 bg-emerald-100';
      case 'absence':
        return 'text-amber-600 bg-amber-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity?.studentName}</span>
                <span className="ml-1">{activity?.description}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity?.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto text-gray-300 mb-4" />
          <h4 className="text-sm font-medium text-gray-900 mb-2">No recent activity</h4>
          <p className="text-xs text-gray-500">Student interactions will appear here</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;