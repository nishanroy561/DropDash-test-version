import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, count, icon, riskLevel, trend }) => {
  const getRiskLevelStyles = () => {
    switch (riskLevel) {
      case 'low':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          count: 'text-green-700',
          trend: trend > 0 ? 'text-green-600' : 'text-red-500'
        };
      case 'medium':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: 'text-amber-600',
          count: 'text-amber-700',
          trend: trend > 0 ? 'text-red-500' : 'text-green-600'
        };
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          count: 'text-red-700',
          trend: trend > 0 ? 'text-red-500' : 'text-green-600'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          count: 'text-blue-700',
          trend: trend > 0 ? 'text-green-600' : 'text-red-500'
        };
    }
  };

  const styles = getRiskLevelStyles();

  return (
    <div className={`${styles?.bg} ${styles?.border} border rounded-lg p-6 transition-smooth hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`${styles?.icon} p-2 rounded-lg bg-white`}>
            <Icon name={icon} size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${styles?.count}`}>{count?.toLocaleString()}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center space-x-1 text-sm font-medium ${styles?.trend}`}>
            <Icon name={trend > 0 ? "TrendingUp" : "TrendingDown"} size={16} />
            <span>{Math.abs(trend)}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs last month</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;