import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const AttendanceChart = ({ attendanceData, attendancePercentage }) => {
  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getAttendanceIcon = (percentage) => {
    if (percentage >= 85) return 'CheckCircle';
    if (percentage >= 70) return 'AlertTriangle';
    return 'AlertCircle';
  };

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Attendance Trends</h3>
            <p className="text-sm text-gray-600">Daily attendance over the last 30 days</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center space-x-2 ${getAttendanceColor(attendancePercentage)}`}>
            <Icon name={getAttendanceIcon(attendancePercentage)} size={20} />
            <span className="text-2xl font-bold">{attendancePercentage}%</span>
          </div>
          <p className="text-sm text-gray-500">Overall Attendance</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value) => [`${value}%`, 'Attendance']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Present Days</p>
          <p className="text-lg font-semibold text-green-600">
            {Math.round((attendancePercentage / 100) * 30)}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Absent Days</p>
          <p className="text-lg font-semibold text-red-600">
            {30 - Math.round((attendancePercentage / 100) * 30)}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Late Arrivals</p>
          <p className="text-lg font-semibold text-amber-600">3</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Early Leaves</p>
          <p className="text-lg font-semibold text-amber-600">1</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;