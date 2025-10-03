import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RiskDistributionChart = ({ chartType = 'bar' }) => {
  const barData = [
    { month: 'Jan', low: 45, medium: 25, high: 12 },
    { month: 'Feb', low: 48, medium: 22, high: 15 },
    { month: 'Mar', low: 52, medium: 28, high: 18 },
    { month: 'Apr', low: 49, medium: 31, high: 22 },
    { month: 'May', low: 55, medium: 29, high: 19 },
    { month: 'Jun', low: 58, medium: 26, high: 16 },
    { month: 'Jul', low: 61, medium: 24, high: 14 },
    { month: 'Aug', low: 59, medium: 27, high: 17 },
    { month: 'Sep', low: 63, medium: 23, high: 13 },
    { month: 'Oct', low: 65, medium: 21, high: 11 }
  ];

  const pieData = [
    { name: 'Low Risk', value: 65, color: '#10B981' },
    { name: 'Medium Risk', value: 21, color: '#F59E0B' },
    { name: 'High Risk', value: 11, color: '#EF4444' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-modal">
          <p className="font-medium text-gray-900">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value} students
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (chartType === 'pie') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Risk Distribution</h3>
        <div className="w-full h-80" aria-label="Risk Distribution Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100)?.toFixed(0)}%`}
              >
                {pieData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload?.length) {
                    const data = payload?.[0]?.payload;
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-modal">
                        <p className="font-medium text-gray-900">{data?.name}</p>
                        <p className="text-sm text-gray-600">{data?.value} students</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Trends</h3>
      <div className="w-full h-80" aria-label="Monthly Risk Distribution Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="low" stackId="a" fill="#10B981" name="Low Risk" radius={[0, 0, 0, 0]} />
            <Bar dataKey="medium" stackId="a" fill="#F59E0B" name="Medium Risk" radius={[0, 0, 0, 0]} />
            <Bar dataKey="high" stackId="a" fill="#EF4444" name="High Risk" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskDistributionChart;