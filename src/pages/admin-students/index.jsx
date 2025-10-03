import React, { useState } from 'react';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import StudentTable from '../admin-dashboard/components/StudentTable';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AdminStudents = () => {
  const summaryStats = {
    total: 1247,
    lowRisk: 811,
    mediumRisk: 262,
    highRisk: 174
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedNavbar userRole="admin" userName="Admin User" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumb userRole="admin" currentPage="Students" />
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">All Students</h1>
                <p className="text-gray-600">
                  Comprehensive overview and management of all students in the system
                </p>
              </div>
              
              <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => alert('Export functionality coming soon!')}
                >
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location?.reload()}
                >
                  Refresh
                </Button>
                <Button
                  variant="default"
                  iconName="UserPlus"
                  iconPosition="left"
                  onClick={() => window.location.href = '/user-registration'}
                >
                  Add Student
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Students</h3>
                  <p className="text-3xl font-bold text-blue-600">{summaryStats?.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="UserCheck" size={24} className="text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Low Risk</h3>
                  <p className="text-3xl font-bold text-green-600">{summaryStats?.lowRisk}</p>
                  <p className="text-sm text-gray-500">{((summaryStats?.lowRisk / summaryStats?.total) * 100)?.toFixed(1)}% of total</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertCircle" size={24} className="text-amber-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Medium Risk</h3>
                  <p className="text-3xl font-bold text-amber-600">{summaryStats?.mediumRisk}</p>
                  <p className="text-sm text-gray-500">{((summaryStats?.mediumRisk / summaryStats?.total) * 100)?.toFixed(1)}% of total</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">High Risk</h3>
                  <p className="text-3xl font-bold text-red-600">{summaryStats?.highRisk}</p>
                  <p className="text-sm text-gray-500">{((summaryStats?.highRisk / summaryStats?.total) * 100)?.toFixed(1)}% of total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Table */}
          <StudentTable />

          {/* Quick Actions Section */}
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="justify-start"
                iconName="FileText"
                iconPosition="left"
                onClick={() => alert('Generate report functionality coming soon!')}
              >
                Generate Report
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                iconName="Mail"
                iconPosition="left"
                onClick={() => alert('Bulk notification functionality coming soon!')}
              >
                Send Notifications
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                iconName="Filter"
                iconPosition="left"
                onClick={() => alert('Advanced filters functionality coming soon!')}
              >
                Advanced Filters
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                iconName="BarChart3"
                iconPosition="left"
                onClick={() => window.location.href = '/admin-dashboard'}
              >
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;