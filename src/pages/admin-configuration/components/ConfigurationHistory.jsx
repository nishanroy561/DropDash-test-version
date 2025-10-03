import React from 'react';
import Icon from '../../../components/AppIcon';

const ConfigurationHistory = () => {
  const historyData = [
    {
      id: 1,
      timestamp: '2025-10-03 10:30:00',
      user: 'Admin User',
      changes: 'Updated attendance threshold from 70% to 75%',
      type: 'threshold'
    },
    {
      id: 2,
      timestamp: '2025-10-02 14:15:00',
      user: 'Admin User',
      changes: 'Modified risk weights: Attendance 30% → 35%',
      type: 'weights'
    },
    {
      id: 3,
      timestamp: '2025-10-01 09:45:00',
      user: 'System Admin',
      changes: 'Reset all configurations to default values',
      type: 'reset'
    },
    {
      id: 4,
      timestamp: '2025-09-30 16:20:00',
      user: 'Admin User',
      changes: 'Updated consecutive absence limit to 7 days',
      type: 'threshold'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'threshold': return 'Settings';
      case 'weights': return 'Scale';
      case 'reset': return 'RotateCcw';
      default: return 'Clock';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'threshold': return 'text-blue-600 bg-blue-50';
      case 'weights': return 'text-green-600 bg-green-50';
      case 'reset': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="History" size={20} className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Configuration History</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Track all configuration changes for audit purposes
      </p>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {historyData?.map((entry) => (
          <div key={entry?.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className={`p-2 rounded-lg ${getTypeColor(entry?.type)}`}>
              <Icon name={getTypeIcon(entry?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{entry?.changes}</p>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-xs text-gray-600">by {entry?.user}</p>
                <span className="text-xs text-gray-400">•</span>
                <p className="text-xs text-gray-600">{entry?.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigurationHistory;