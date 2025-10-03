import React, { useState } from 'react';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AdminMentors = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  
  const summaryStats = {
    total: 47,
    active: 42,
    inactive: 5,
    newThisMonth: 8
  };

  // Mock mentor data
  const mentors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@school.edu',
      department: 'Computer Science',
      studentsAssigned: 15,
      status: 'active',
      joinDate: '2023-01-15',
      avgRating: 4.8,
      completedSessions: 124
    },
    {
      id: 2,
      name: 'Prof. Rajesh Kumar',
      email: 'rajesh.kumar@school.edu',
      department: 'Mathematics',
      studentsAssigned: 18,
      status: 'active',
      joinDate: '2022-09-10',
      avgRating: 4.6,
      completedSessions: 198
    },
    {
      id: 3,
      name: 'Dr. Kavita Patel',
      email: 'kavita.patel@school.edu',
      department: 'Psychology',
      studentsAssigned: 12,
      status: 'active',
      joinDate: '2023-03-22',
      avgRating: 4.9,
      completedSessions: 87
    },
    {
      id: 4,
      name: 'Prof. Arjun Gupta',
      email: 'arjun.gupta@school.edu',
      department: 'Engineering',
      studentsAssigned: 0,
      status: 'inactive',
      joinDate: '2023-08-01',
      avgRating: 4.5,
      completedSessions: 23
    },
    {
      id: 5,
      name: 'Dr. Meera Singh',
      email: 'meera.singh@school.edu',
      department: 'Biology',
      studentsAssigned: 20,
      status: 'active',
      joinDate: '2022-11-05',
      avgRating: 4.7,
      completedSessions: 156
    }
  ];

  const filteredMentors = mentors?.filter(mentor => {
    if (currentFilter === 'all') return true;
    return mentor?.status === currentFilter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inactive' }
    };
    const config = statusConfig?.[status] || statusConfig?.inactive;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const handleViewProfile = (mentorId) => {
    alert(`View mentor profile functionality coming soon! Mentor ID: ${mentorId}`);
  };

  const handleAssignStudents = (mentorId) => {
    alert(`Assign students functionality coming soon! Mentor ID: ${mentorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedNavbar userRole="admin" userName="Admin User" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumb userRole="admin" currentPage="Mentors" />
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">All Mentors</h1>
                <p className="text-gray-600">
                  Comprehensive overview and management of all mentors in the system
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
                  Add Mentor
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="UserCheck" size={24} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Mentors</h3>
                  <p className="text-3xl font-bold text-blue-600">{summaryStats?.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Active</h3>
                  <p className="text-3xl font-bold text-green-600">{summaryStats?.active}</p>
                  <p className="text-sm text-gray-500">{((summaryStats?.active / summaryStats?.total) * 100)?.toFixed(1)}% of total</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon name="Pause" size={24} className="text-gray-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Inactive</h3>
                  <p className="text-3xl font-bold text-gray-600">{summaryStats?.inactive}</p>
                  <p className="text-sm text-gray-500">{((summaryStats?.inactive / summaryStats?.total) * 100)?.toFixed(1)}% of total</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">New This Month</h3>
                  <p className="text-3xl font-bold text-purple-600">{summaryStats?.newThisMonth}</p>
                  <p className="text-sm text-gray-500">Recently joined</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setCurrentFilter('all')}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    currentFilter === 'all' ?'border-primary text-primary' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  All Mentors ({summaryStats?.total})
                </button>
                <button
                  onClick={() => setCurrentFilter('active')}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    currentFilter === 'active' ?'border-primary text-primary' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Active ({summaryStats?.active})
                </button>
                <button
                  onClick={() => setCurrentFilter('inactive')}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    currentFilter === 'inactive' ?'border-primary text-primary' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Inactive ({summaryStats?.inactive})
                </button>
              </nav>
            </div>
          </div>

          {/* Mentors Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mentor Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students Assigned
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMentors?.map((mentor) => (
                    <tr key={mentor?.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <Icon name="User" size={20} color="white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {mentor?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {mentor?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{mentor?.department}</div>
                        <div className="text-sm text-gray-500">Since {new Date(mentor?.joinDate)?.toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-900">{mentor?.studentsAssigned}</div>
                        <div className="text-xs text-gray-500">students</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Rating: {mentor?.avgRating}/5</div>
                        <div className="text-sm text-gray-500">{mentor?.completedSessions} sessions</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(mentor?.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            iconName="Eye"
                            onClick={() => handleViewProfile(mentor?.id)}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            iconName="Users"
                            onClick={() => handleAssignStudents(mentor?.id)}
                          >
                            Assign
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="justify-start"
                iconName="FileText"
                iconPosition="left"
                onClick={() => alert('Generate mentor report functionality coming soon!')}
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
                iconName="UserPlus"
                iconPosition="left"
                onClick={() => alert('Bulk student assignment functionality coming soon!')}
              >
                Bulk Assign Students
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

export default AdminMentors;