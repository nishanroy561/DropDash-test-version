import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionPanel = ({ onScheduleFollowUp, onBulkMessage, onGenerateReport }) => {
  const quickActions = [
    {
      id: 'schedule',
      title: 'Schedule Follow-up',
      description: 'Set reminders for student check-ins',
      icon: 'Calendar',
      color: 'blue',
      onClick: onScheduleFollowUp
    },
    {
      id: 'message',
      title: 'Send Bulk Message',
      description: 'Message multiple students at once',
      icon: 'MessageCircle',
      color: 'green',
      onClick: onBulkMessage
    },
    {
      id: 'report',
      title: 'Generate Report',
      description: 'Create intervention summary report',
      icon: 'FileText',
      color: 'amber',
      onClick: onGenerateReport
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      green: 'bg-green-50 hover:bg-green-100 border-green-200',
      amber: 'bg-amber-50 hover:bg-amber-100 border-amber-200'
    };
    return colors?.[color] || colors?.blue;
  };

  const getIconColor = (color) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      amber: 'text-amber-600'
    };
    return colors?.[color] || colors?.blue;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.onClick}
            className={`w-full p-4 rounded-lg border transition-smooth text-left ${getColorClasses(action?.color)}`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Icon name={action?.icon} size={20} className={getIconColor(action?.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">{action?.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{action?.description}</p>
              </div>
              <div className="flex-shrink-0">
                <Icon name="ChevronRight" size={16} className="text-gray-400" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionPanel;