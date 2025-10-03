import React from 'react';
import Icon from '../../../components/AppIcon';
import ThresholdSlider from './ThresholdSlider';

const RiskWeightCard = ({ 
  title, 
  icon, 
  weight, 
  onWeightChange, 
  color = 'blue',
  description 
}) => {
  const getIconColor = () => {
    switch (color) {
      case 'red': return 'text-red-600';
      case 'amber': return 'text-amber-600';
      case 'green': return 'text-green-600';
      default: return 'text-blue-600';
    }
  };

  const getBgColor = () => {
    switch (color) {
      case 'red': return 'bg-red-50';
      case 'amber': return 'bg-amber-50';
      case 'green': return 'bg-green-50';
      default: return 'bg-blue-50';
    }
  };

  return (
    <div className={`${getBgColor()} rounded-lg p-4 border border-gray-200`}>
      <div className="flex items-center space-x-3 mb-3">
        <div className={`p-2 rounded-lg bg-white ${getIconColor()}`}>
          <Icon name={icon} size={20} />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          {description && (
            <p className="text-xs text-gray-600">{description}</p>
          )}
        </div>
      </div>
      <ThresholdSlider
        label="Weight"
        value={weight}
        onChange={onWeightChange}
        min={0}
        max={100}
        unit="%"
        color={color}
        description=""
      />
    </div>
  );
};

export default RiskWeightCard;