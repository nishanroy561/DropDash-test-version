import React from 'react';
import Icon from '../../../components/AppIcon';

const MentorStatsCard = ({ title, value, subtitle, icon, color = 'blue', trend = null }) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        text: 'text-blue-600'
      },
      red: {
        bg: 'bg-red-50',
        icon: 'text-red-600',
        text: 'text-red-600'
      },
      amber: {
        bg: 'bg-amber-50',
        icon: 'text-amber-600',
        text: 'text-amber-600'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        text: 'text-green-600'
      }
    };
    return colors?.[color] || colors?.blue;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-card hover:shadow-modal transition-smooth">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <Icon 
                name={trend?.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={trend?.direction === 'up' ? 'text-green-500' : 'text-red-500'} 
              />
              <span className={`text-sm ml-1 ${trend?.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend?.value}% from last week
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 ${colorClasses?.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colorClasses?.icon} />
        </div>
      </div>
    </div>
  );
};

export default MentorStatsCard;