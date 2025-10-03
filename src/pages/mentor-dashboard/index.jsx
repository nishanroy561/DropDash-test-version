import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import HighRiskStudentCard from './components/HighRiskStudentCard';
import StudentTable from './components/StudentTable';
import MentorStatsCard from './components/MentorStatsCard';
import QuickActionPanel from './components/QuickActionPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import Button from '../../components/ui/Button';


const MentorDashboard = () => {
  const navigate = useNavigate();
  const [currentMentor] = useState({
    id: 'mentor_001',
    name: 'Dr. Rajesh Kumar',
    role: 'mentor'
  });

  // Mock data for assigned students
  const [assignedStudents] = useState([
    {
      id: 'student_001',
      name: 'Ravi Sharma',
      class: 'Class 10-A',
      rollNumber: 'R001',
      riskLevel: 'High',
      attendance: 65,
      lastScore: 45,
      scoreChange: -15,
      consecutiveAbsent: 5,
      lastInteraction: '2025-09-28T10:30:00Z',
      alerts: [
        { type: 'attendance', message: 'Absent for 5 consecutive days' },
        { type: 'grades', message: 'Score dropped by 15% in last test' }
      ]
    },
    {
      id: 'student_002',
      name: 'Anjali Verma',
      class: 'Class 10-B',
      rollNumber: 'A002',
      riskLevel: 'High',
      attendance: 70,
      lastScore: 52,
      scoreChange: -12,
      consecutiveAbsent: 3,
      lastInteraction: '2025-09-30T14:15:00Z',
      alerts: [
        { type: 'grades', message: 'Failing in Mathematics' },
        { type: 'fees', message: 'Fee payment overdue by 15 days' }
      ]
    },
    {
      id: 'student_003',
      name: 'Priya Singh',
      class: 'Class 10-A',
      rollNumber: 'P003',
      riskLevel: 'Medium',
      attendance: 78,
      lastScore: 68,
      scoreChange: -8,
      consecutiveAbsent: 2,
      lastInteraction: '2025-10-01T09:45:00Z',
      alerts: [
        { type: 'attendance', message: 'Attendance below 80%' }
      ]
    },
    {
      id: 'student_004',
      name: 'Arjun Patel',
      class: 'Class 10-C',
      rollNumber: 'A004',
      riskLevel: 'Medium',
      attendance: 82,
      lastScore: 72,
      scoreChange: 3,
      consecutiveAbsent: 1,
      lastInteraction: '2025-10-02T11:20:00Z',
      alerts: [
        { type: 'grades', message: 'Inconsistent performance in Science' }
      ]
    },
    {
      id: 'student_005',
      name: 'Kavya Reddy',
      class: 'Class 10-B',
      rollNumber: 'K005',
      riskLevel: 'Low',
      attendance: 92,
      lastScore: 85,
      scoreChange: 5,
      consecutiveAbsent: 0,
      lastInteraction: '2025-10-01T16:30:00Z',
      alerts: []
    },
    {
      id: 'student_006',
      name: 'Vikram Gupta',
      class: 'Class 10-A',
      rollNumber: 'V006',
      riskLevel: 'Low',
      attendance: 88,
      lastScore: 78,
      scoreChange: 2,
      consecutiveAbsent: 0,
      lastInteraction: '2025-09-29T13:10:00Z',
      alerts: []
    },
    {
      id: 'student_007',
      name: 'Meera Joshi',
      class: 'Class 10-C',
      rollNumber: 'M007',
      riskLevel: 'High',
      attendance: 62,
      lastScore: 48,
      scoreChange: -18,
      consecutiveAbsent: 4,
      lastInteraction: '2025-09-27T15:45:00Z',
      alerts: [
        { type: 'attendance', message: 'Critical attendance level' },
        { type: 'grades', message: 'Significant grade decline' },
        { type: 'fees', message: 'Fee payment pending' }
      ]
    },
    {
      id: 'student_008',
      name: 'Rohit Agarwal',
      class: 'Class 10-B',
      rollNumber: 'R008',
      riskLevel: 'Medium',
      attendance: 75,
      lastScore: 65,
      scoreChange: -5,
      consecutiveAbsent: 2,
      lastInteraction: '2025-10-01T12:00:00Z',
      alerts: [
        { type: 'attendance', message: 'Needs improvement in attendance' }
      ]
    }
  ]);

  // Mock recent activities
  const [recentActivities] = useState([
    {
      id: 'activity_001',
      type: 'note',
      studentName: 'Ravi Sharma',
      description: 'added mentoring note about attendance concerns',
      timestamp: '2025-10-03T09:30:00Z'
    },
    {
      id: 'activity_002',
      type: 'meeting',
      studentName: 'Anjali Verma',
      description: 'completed one-on-one counseling session',
      timestamp: '2025-10-02T14:15:00Z'
    },
    {
      id: 'activity_003',
      type: 'alert',
      studentName: 'Meera Joshi',
      description: 'triggered high-risk alert for consecutive absences',
      timestamp: '2025-10-02T08:45:00Z'
    },
    {
      id: 'activity_004',
      type: 'improvement',
      studentName: 'Kavya Reddy',
      description: 'showed improvement in Mathematics score',
      timestamp: '2025-10-01T16:30:00Z'
    },
    {
      id: 'activity_005',
      type: 'absence',
      studentName: 'Ravi Sharma',
      description: 'marked absent for 5th consecutive day',
      timestamp: '2025-10-01T10:00:00Z'
    }
  ]);

  // Get high-risk students for priority section
  const highRiskStudents = assignedStudents?.filter(student => student?.riskLevel === 'High');

  // Calculate stats
  const stats = {
    totalStudents: assignedStudents?.length,
    highRiskCount: assignedStudents?.filter(s => s?.riskLevel === 'High')?.length,
    mediumRiskCount: assignedStudents?.filter(s => s?.riskLevel === 'Medium')?.length,
    lowRiskCount: assignedStudents?.filter(s => s?.riskLevel === 'Low')?.length,
    averageAttendance: Math.round(assignedStudents?.reduce((sum, s) => sum + s?.attendance, 0) / assignedStudents?.length),
    recentInteractions: assignedStudents?.filter(s => {
      const daysSinceInteraction = Math.floor((new Date() - new Date(s.lastInteraction)) / (1000 * 60 * 60 * 24));
      return daysSinceInteraction <= 7;
    })?.length
  };

  const handleViewProfile = (studentId) => {
    navigate(`/student-profile?id=${studentId}`);
  };

  const handleAddNote = (studentId) => {
    navigate(`/student-profile?id=${studentId}&action=add-note`);
  };

  const handleScheduleFollowUp = () => {
    // Mock implementation - would open scheduling modal
    console.log('Schedule follow-up clicked');
  };

  const handleBulkMessage = () => {
    // Mock implementation - would open bulk messaging modal
    console.log('Bulk message clicked');
  };

  const handleGenerateReport = () => {
    // Mock implementation - would generate and download report
    console.log('Generate report clicked');
  };

  useEffect(() => {
    document.title = 'Mentor Dashboard - DropoutDash';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedNavbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumb userRole={currentMentor?.role} />
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Monitor and support your assigned students with targeted interventions
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="default"
                  onClick={() => navigate('/mentor-students')}
                  iconName="Users"
                  iconPosition="left"
                >
                  My Students
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MentorStatsCard
              title="Total Students"
              value={stats?.totalStudents}
              subtitle="Assigned to you"
              icon="Users"
              color="blue"
            />
            <MentorStatsCard
              title="High Risk"
              value={stats?.highRiskCount}
              subtitle="Need immediate attention"
              icon="AlertTriangle"
              color="red"
              trend={{ direction: 'down', value: 12 }}
            />
            <MentorStatsCard
              title="Average Attendance"
              value={`${stats?.averageAttendance}%`}
              subtitle="Across all students"
              icon="Calendar"
              color="amber"
              trend={{ direction: 'up', value: 3 }}
            />
            <MentorStatsCard
              title="Recent Interactions"
              value={stats?.recentInteractions}
              subtitle="This week"
              icon="MessageCircle"
              color="green"
              trend={{ direction: 'up', value: 25 }}
            />
          </div>

          {/* High Risk Students Priority Section */}
          {highRiskStudents?.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Priority Students</h2>
                  <p className="text-gray-600 mt-1">High-risk students requiring immediate intervention</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate('/mentor-students?filter=high-risk')}
                  iconName="Filter"
                  iconPosition="left"
                  size="sm"
                >
                  View All High Risk
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highRiskStudents?.slice(0, 3)?.map((student) => (
                  <HighRiskStudentCard
                    key={student?.id}
                    student={student}
                    onViewProfile={handleViewProfile}
                    onAddNote={handleAddNote}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Student Table - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">My Students</h2>
                <p className="text-gray-600">Manage and track all students assigned to you</p>
              </div>
              <StudentTable
                students={assignedStudents}
                onViewProfile={handleViewProfile}
                onAddNote={handleAddNote}
              />
            </div>

            {/* Sidebar - Takes 1 column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActionPanel
                onScheduleFollowUp={handleScheduleFollowUp}
                onBulkMessage={handleBulkMessage}
                onGenerateReport={handleGenerateReport}
              />

              {/* Recent Activity */}
              <RecentActivityFeed activities={recentActivities} />

              {/* Risk Level Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">High Risk</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{stats?.highRiskCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Medium Risk</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{stats?.mediumRiskCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Low Risk</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{stats?.lowRiskCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;