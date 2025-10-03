import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HighRiskStudentCard = ({ student, onViewProfile, onAddNote }) => {
  const getRiskBadgeColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (alertType) => {
    switch (alertType) {
      case 'attendance':
        return 'UserX';
      case 'grades':
        return 'TrendingDown';
      case 'fees':
        return 'DollarSign';
      default:
        return 'AlertTriangle';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-red-200 p-6 shadow-card hover:shadow-modal transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{student?.name}</h3>
            <p className="text-sm text-gray-600">{student?.class} • {student?.rollNumber}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(student?.riskLevel)}`}>
          {student?.riskLevel} Risk
        </span>
      </div>
      <div className="space-y-3 mb-4">
        {student?.alerts?.map((alert, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <Icon name={getAlertIcon(alert?.type)} size={16} className="text-red-500" />
            <span className="text-gray-700">{alert?.message}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <p className="text-xs text-gray-500">Attendance</p>
          <p className="text-sm font-semibold text-gray-900">{student?.attendance}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Last Score</p>
          <p className="text-sm font-semibold text-gray-900">{student?.lastScore}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Days Absent</p>
          <p className="text-sm font-semibold text-gray-900">{student?.consecutiveAbsent}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile(student?.id)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Profile
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onAddNote(student?.id)}
          iconName="MessageSquare"
          iconPosition="left"
          className="flex-1"
        >
          Add Note
        </Button>
      </div>
    </div>
  );
};

export default HighRiskStudentCard;