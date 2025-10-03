import React from 'react';

const ThresholdSlider = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1, 
  unit = '%',
  description,
  color = 'blue'
}) => {
  const getSliderColor = () => {
    switch (color) {
      case 'red': return 'accent-red-500';
      case 'amber': return 'accent-amber-500';
      case 'green': return 'accent-green-500';
      default: return 'accent-blue-500';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-gray-900">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e?.target?.value))}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${getSliderColor()}`}
      />
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default ThresholdSlider;