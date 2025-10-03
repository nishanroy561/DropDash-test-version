import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/input';
import Icon from '../../components/AppIcon';
import ConfigurationSection from './components/ConfigurationSection';
import ThresholdSlider from './components/ThresholdSlider';
import RiskWeightCard from './components/RiskWeightCard';
import ConfigurationPreview from './components/ConfigurationPreview';
import ConfigurationHistory from './components/ConfigurationHistory';

const AdminConfiguration = () => {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [config, setConfig] = useState({
    attendanceThreshold: 75,
    scoreThreshold: 60,
    consecutiveAbsences: 7,
    feeOverdueDays: 30,
    riskWeights: {
      attendance: 35,
      scores: 25,
      fees: 20,
      absences: 20
    }
  });

  const [originalConfig] = useState({ ...config });

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleWeightChange = (type, value) => {
    setConfig(prev => ({
      ...prev,
      riskWeights: {
        ...prev?.riskWeights,
        [type]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setShowConfirmDialog(true);
  };

  const confirmSave = () => {
    // Simulate API call
    setTimeout(() => {
      setShowConfirmDialog(false);
      setShowSuccessMessage(true);
      setHasUnsavedChanges(false);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setConfig({ ...originalConfig });
    setHasUnsavedChanges(false);
  };

  const handleResetSection = (section) => {
    const defaults = {
      attendance: { attendanceThreshold: 75 },
      scores: { scoreThreshold: 60 },
      absences: { consecutiveAbsences: 7 },
      fees: { feeOverdueDays: 30 },
      weights: {
        riskWeights: {
          attendance: 35,
          scores: 25,
          fees: 20,
          absences: 20
        }
      }
    };

    setConfig(prev => ({
      ...prev,
      ...defaults?.[section]
    }));
    setHasUnsavedChanges(true);
  };

  const totalWeight = Object.values(config?.riskWeights)?.reduce((sum, weight) => sum + weight, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedNavbar userRole="admin" userName="Admin User" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumb 
            userRole="admin"
            customBreadcrumbs={[
              { label: 'Dashboard', path: '/admin-dashboard', isActive: false },
              { label: 'Configuration', path: '/admin-configuration', isActive: true }
            ]}
          />

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
                <p className="text-gray-600 mt-2">
                  Customize risk assessment parameters and threshold management
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {hasUnsavedChanges && (
                  <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <Icon name="AlertTriangle" size={16} />
                    <span className="text-sm font-medium">Unsaved changes</span>
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={!hasUnsavedChanges}
                  iconName="X"
                  iconPosition="left"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges || totalWeight !== 100}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {showSuccessMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
                <p className="text-green-800 font-medium">Configuration saved successfully!</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Attendance Configuration */}
              <ConfigurationSection
                title="Attendance Thresholds"
                description="Set minimum attendance requirements for risk assessment"
                showReset
                onReset={() => handleResetSection('attendance')}
              >
                <ThresholdSlider
                  label="Minimum Attendance Threshold"
                  value={config?.attendanceThreshold}
                  onChange={(value) => handleConfigChange('attendanceThreshold', value)}
                  min={50}
                  max={95}
                  unit="%"
                  description="Students below this attendance percentage will be flagged as at-risk"
                  color="blue"
                />
              </ConfigurationSection>

              {/* Academic Performance */}
              <ConfigurationSection
                title="Academic Performance"
                description="Configure score thresholds for academic risk assessment"
                showReset
                onReset={() => handleResetSection('scores')}
              >
                <ThresholdSlider
                  label="Minimum Score Threshold"
                  value={config?.scoreThreshold}
                  onChange={(value) => handleConfigChange('scoreThreshold', value)}
                  min={30}
                  max={80}
                  unit="%"
                  description="Students scoring below this threshold will be considered at academic risk"
                  color="green"
                />
              </ConfigurationSection>

              {/* Absence Limits */}
              <ConfigurationSection
                title="Absence Monitoring"
                description="Set limits for consecutive absences"
                showReset
                onReset={() => handleResetSection('absences')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Consecutive Absence Limit"
                    type="number"
                    value={config?.consecutiveAbsences}
                    onChange={(e) => handleConfigChange('consecutiveAbsences', parseInt(e?.target?.value))}
                    min={3}
                    max={15}
                    description="Maximum consecutive days a student can be absent"
                  />
                </div>
              </ConfigurationSection>

              {/* Fee Management */}
              <ConfigurationSection
                title="Fee Management"
                description="Configure fee overdue thresholds"
                showReset
                onReset={() => handleResetSection('fees')}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Fee Overdue Days"
                    type="number"
                    value={config?.feeOverdueDays}
                    onChange={(e) => handleConfigChange('feeOverdueDays', parseInt(e?.target?.value))}
                    min={7}
                    max={90}
                    description="Days after which overdue fees trigger risk alerts"
                  />
                </div>
              </ConfigurationSection>

              {/* Risk Weights */}
              <ConfigurationSection
                title="Risk Weight Distribution"
                description={`Configure how different factors contribute to overall risk calculation (Total: ${totalWeight}%)`}
                showReset
                onReset={() => handleResetSection('weights')}
              >
                {totalWeight !== 100 && (
                  <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-amber-600" />
                      <p className="text-amber-800 text-sm font-medium">
                        Risk weights must total 100%. Current total: {totalWeight}%
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RiskWeightCard
                    title="Attendance"
                    icon="Calendar"
                    weight={config?.riskWeights?.attendance}
                    onWeightChange={(value) => handleWeightChange('attendance', value)}
                    color="blue"
                    description="Impact of attendance on risk calculation"
                  />
                  <RiskWeightCard
                    title="Academic Scores"
                    icon="BookOpen"
                    weight={config?.riskWeights?.scores}
                    onWeightChange={(value) => handleWeightChange('scores', value)}
                    color="green"
                    description="Impact of academic performance on risk"
                  />
                  <RiskWeightCard
                    title="Fee Status"
                    icon="CreditCard"
                    weight={config?.riskWeights?.fees}
                    onWeightChange={(value) => handleWeightChange('fees', value)}
                    color="amber"
                    description="Impact of fee payment status on risk"
                  />
                  <RiskWeightCard
                    title="Absences"
                    icon="UserX"
                    weight={config?.riskWeights?.absences}
                    onWeightChange={(value) => handleWeightChange('absences', value)}
                    color="red"
                    description="Impact of consecutive absences on risk"
                  />
                </div>
              </ConfigurationSection>
            </div>

            <div className="space-y-6">
              <ConfigurationPreview config={config} />
              <ConfigurationHistory />
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-modal max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icon name="AlertCircle" size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confirm Configuration Changes</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to save these configuration changes? This will affect how student risk levels are calculated across the entire system.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={confirmSave}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConfiguration;