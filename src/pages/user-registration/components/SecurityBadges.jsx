import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Storage',
      description: 'All passwords are hashed and securely stored'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your Security Matters</h3>
          <p className="text-sm text-gray-600">We use industry-standard security measures</p>
        </div>

        <div className="space-y-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={feature?.icon} size={16} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">{feature?.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-500" />
              <span className="text-xs text-gray-600">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-500" />
              <span className="text-xs text-gray-600">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;