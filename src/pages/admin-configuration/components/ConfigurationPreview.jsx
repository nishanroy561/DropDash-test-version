import React from 'react';
import Icon from '../../../components/AppIcon';

const ConfigurationPreview = ({ config }) => {
  const calculateRiskLevel = (attendance, scores, fees, absences) => {
    const attendanceWeight = config?.riskWeights?.attendance / 100;
    const scoresWeight = config?.riskWeights?.scores / 100;
    const feesWeight = config?.riskWeights?.fees / 100;
    const absencesWeight = config?.riskWeights?.absences / 100;

    let riskScore = 0;

    // Attendance risk
    if (attendance < config?.attendanceThreshold) {
      riskScore += attendanceWeight * 100;
    }

    // Score risk
    if (scores < config?.scoreThreshold) {
      riskScore += scoresWeight * 100;
    }

    // Fee risk
    if (fees > config?.feeOverdueDays) {
      riskScore += feesWeight * 100;
    }

    // Absence risk
    if (absences >= config?.consecutiveAbsences) {
      riskScore += absencesWeight * 100;
    }

    if (riskScore >= 70) return 'High';
    if (riskScore >= 40) return 'Medium';
    return 'Low';
  };

  const sampleStudents = [
    { name: 'Ravi Sharma', attendance: 65, scores: 45, fees: 15, absences: 8 },
    { name: 'Anjali Verma', attendance: 85, scores: 78, fees: 5, absences: 2 },
    { name: 'Priya Singh', attendance: 45, scores: 35, fees: 25, absences: 12 }
  ];

  const getRiskBadge = (level) => {
    const colors = {
      High: 'bg-red-100 text-red-800 border-red-200',
      Medium: 'bg-amber-100 text-amber-800 border-amber-200',
      Low: 'bg-green-100 text-green-800 border-green-200'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colors?.[level]}`}>
        {level}Risk
              </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Eye" size={20} className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Configuration Preview</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        See how your current settings would affect student risk calculations
      </p>
      <div className="space-y-3">
        {sampleStudents?.map((student, index) => {
          const riskLevel = calculateRiskLevel(
            student?.attendance, 
            student?.scores, 
            student?.fees, 
            student?.absences
          );
          
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{student?.name}</p>
                <p className="text-xs text-gray-600">
                  Attendance: {student?.attendance}% | Scores: {student?.scores}% | 
                  Fee Overdue: {student?.fees} days | Absences: {student?.absences}
                </p>
              </div>
              {getRiskBadge(riskLevel)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConfigurationPreview;