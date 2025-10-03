import React from 'react';

import Button from '../../../components/ui/Button';

const ConfigurationSection = ({ 
  title, 
  description, 
  children, 
  onReset, 
  showReset = false 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        {showReset && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default ConfigurationSection;