import React, { useState } from 'react';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import SummaryCard from './components/SummaryCard';
import RiskDistributionChart from './components/RiskDistributionChart';
import StudentTable from './components/StudentTable';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const [chartType, setChartType] = useState('bar');

  const summaryData = [
    {
      title: 'Total Students',
      count: 1247,
      icon: 'Users',
      riskLevel: 'total',
      trend: 5.2
    },
    {
      title: 'Low Risk Students',
      count: 811,
      icon: 'UserCheck',
      riskLevel: 'low',
      trend: 8.1
    },
    {
      title: 'Medium Risk Students',
      count: 262,
      icon: 'AlertCircle',
      riskLevel: 'medium',
      trend: -3.2
    },
    {
      title: 'High Risk Students',
      count: 174,
      icon: 'AlertTriangle',
      riskLevel: 'high',
      trend: -12.5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedNavbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumb userRole="admin" />
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">
                  Comprehensive overview of student risk analytics and system management
                </p>
              </div>
              
              <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location?.reload()}
                >
                  Refresh Data
                </Button>
                <Button
                  variant="default"
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => window.location.href = '/admin-configuration'}
                >
                  Configuration
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryData?.map((data, index) => (
              <SummaryCard
                key={index}
                title={data?.title}
                count={data?.count}
                icon={data?.icon}
                riskLevel={data?.riskLevel}
                trend={data?.trend}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Risk Distribution</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={chartType === 'bar' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setChartType('bar')}
                    iconName="BarChart3"
                    iconSize={16}
                  >
                    Bar
                  </Button>
                  <Button
                    variant={chartType === 'pie' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setChartType('pie')}
                    iconName="PieChart"
                    iconSize={16}
                  >
                    Pie
                  </Button>
                </div>
              </div>
              <RiskDistributionChart chartType={chartType} />
            </div>
            
            <div className="lg:col-span-1">
              <RecentActivity />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Student Table */}
          <div className="mb-8">
            <StudentTable />
          </div>

          {/* Footer Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                  <Icon name="TrendingUp" size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Improvement Rate</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">23.5%</p>
                <p className="text-sm text-gray-600">Students moved to lower risk</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                  <Icon name="Target" size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Intervention Success</h3>
                <p className="text-3xl font-bold text-green-600 mb-1">87.2%</p>
                <p className="text-sm text-gray-600">Successful mentor interventions</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                  <Icon name="Clock" size={24} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Early Detection</h3>
                <p className="text-3xl font-bold text-purple-600 mb-1">15.3</p>
                <p className="text-sm text-gray-600">Days average early warning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;