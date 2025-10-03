import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import StudentTable from '../mentor-dashboard/components/StudentTable';

const MentorStudentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMentor] = useState({
    id: 'mentor_001',
    name: 'Dr. Rajesh Kumar',
    role: 'mentor'
  });

  // Reuse mock data for assigned students (same structure as dashboard)
  const [assignedStudents] = useState([
    { id: 'student_001', name: 'Ravi Sharma', class: 'Class 10-A', rollNumber: 'R001', riskLevel: 'High', attendance: 65, lastScore: 45, scoreChange: -15, consecutiveAbsent: 5, lastInteraction: '2025-09-28T10:30:00Z', alerts: [] },
    { id: 'student_002', name: 'Anjali Verma', class: 'Class 10-B', rollNumber: 'A002', riskLevel: 'High', attendance: 70, lastScore: 52, scoreChange: -12, consecutiveAbsent: 3, lastInteraction: '2025-09-30T14:15:00Z', alerts: [] },
    { id: 'student_003', name: 'Priya Singh', class: 'Class 10-A', rollNumber: 'P003', riskLevel: 'Medium', attendance: 78, lastScore: 68, scoreChange: -8, consecutiveAbsent: 2, lastInteraction: '2025-10-01T09:45:00Z', alerts: [] },
    { id: 'student_004', name: 'Arjun Patel', class: 'Class 10-C', rollNumber: 'A004', riskLevel: 'Medium', attendance: 82, lastScore: 72, scoreChange: 3, consecutiveAbsent: 1, lastInteraction: '2025-10-02T11:20:00Z', alerts: [] },
    { id: 'student_005', name: 'Kavya Reddy', class: 'Class 10-B', rollNumber: 'K005', riskLevel: 'Low', attendance: 92, lastScore: 85, scoreChange: 5, consecutiveAbsent: 0, lastInteraction: '2025-10-01T16:30:00Z', alerts: [] },
    { id: 'student_006', name: 'Vikram Gupta', class: 'Class 10-A', rollNumber: 'V006', riskLevel: 'Low', attendance: 88, lastScore: 78, scoreChange: 2, consecutiveAbsent: 0, lastInteraction: '2025-09-29T13:10:00Z', alerts: [] },
    { id: 'student_007', name: 'Meera Joshi', class: 'Class 10-C', rollNumber: 'M007', riskLevel: 'High', attendance: 62, lastScore: 48, scoreChange: -18, consecutiveAbsent: 4, lastInteraction: '2025-09-27T15:45:00Z', alerts: [] },
    { id: 'student_008', name: 'Rohit Agarwal', class: 'Class 10-B', rollNumber: 'R008', riskLevel: 'Medium', attendance: 75, lastScore: 65, scoreChange: -5, consecutiveAbsent: 2, lastInteraction: '2025-10-01T12:00:00Z', alerts: [] }
  ]);

  const handleViewProfile = (studentId) => {
    navigate(`/student-profile?id=${studentId}`);
  };

  const handleAddNote = (studentId) => {
    navigate(`/student-profile?id=${studentId}&action=add-note`);
  };

  // Optional: support filter param like ?filter=high-risk
  useEffect(() => {
    document.title = 'My Students - DropoutDash';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedNavbar userRole={currentMentor.role} userName={currentMentor.name} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumb
            userRole={currentMentor.role}
            customBreadcrumbs={[
              { label: 'Dashboard', path: '/mentor-dashboard', isActive: false },
              { label: 'My Students', path: '/mentor-students', isActive: true }
            ]}
          />

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
            <p className="text-gray-600 mt-1">Browse and manage students assigned to you</p>
          </div>

          <StudentTable
            students={assignedStudents}
            onViewProfile={handleViewProfile}
            onAddNote={handleAddNote}
          />
        </div>
      </main>
    </div>
  );
};

export default MentorStudentsPage;


