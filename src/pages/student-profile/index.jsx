import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RoleBasedNavbar from '../../components/ui/RoleBasedNavbar';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import StudentHeader from './components/StudentHeader';
import AttendanceChart from './components/AttendanceChart';
import ScoreChart from './components/ScoreChart';
import FeeStatus from './components/FeeStatus';
import MentoringNotes from './components/MentoringNotes';

const StudentProfile = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState('student');
  const [currentUser, setCurrentUser] = useState('Ravi Sharma');
  const [mentoringNotes, setMentoringNotes] = useState([]);

  // Parse student id from query params
  const searchParams = new URLSearchParams(location.search);
  const selectedId = searchParams.get('id');

  // Minimal in-memory mock directory to map ids to display data
  const studentDirectory = {
    'student_001': { id: 'student_001', name: 'Ravi Sharma', class: 'Class 10-A', mentor: 'Dr. Rajesh Kumar', riskLevel: 'High', email: 'ravi.sharma@school.edu', phone: '+91 98765 43210', parentContact: '+91 98765 43211' },
    'student_002': { id: 'student_002', name: 'Anjali Verma', class: 'Class 10-B', mentor: 'Dr. Rajesh Kumar', riskLevel: 'High', email: 'anjali.verma@school.edu', phone: '+91 98765 43212', parentContact: '+91 98765 43213' },
    'student_003': { id: 'student_003', name: 'Priya Singh', class: 'Class 10-A', mentor: 'Dr. Rajesh Kumar', riskLevel: 'Medium', email: 'priya.singh@school.edu', phone: '+91 98765 43214', parentContact: '+91 98765 43215' },
    'student_004': { id: 'student_004', name: 'Arjun Patel', class: 'Class 10-C', mentor: 'Dr. Rajesh Kumar', riskLevel: 'Medium', email: 'arjun.patel@school.edu', phone: '+91 98765 43216', parentContact: '+91 98765 43217' },
    'student_005': { id: 'student_005', name: 'Kavya Reddy', class: 'Class 10-B', mentor: 'Dr. Rajesh Kumar', riskLevel: 'Low', email: 'kavya.reddy@school.edu', phone: '+91 98765 43218', parentContact: '+91 98765 43219' },
    'student_006': { id: 'student_006', name: 'Vikram Gupta', class: 'Class 10-A', mentor: 'Dr. Rajesh Kumar', riskLevel: 'Low', email: 'vikram.gupta@school.edu', phone: '+91 98765 43220', parentContact: '+91 98765 43221' },
    'student_007': { id: 'student_007', name: 'Meera Joshi', class: 'Class 10-C', mentor: 'Dr. Rajesh Kumar', riskLevel: 'High', email: 'meera.joshi@school.edu', phone: '+91 98765 43222', parentContact: '+91 98765 43223' },
    'student_008': { id: 'student_008', name: 'Rohit Agarwal', class: 'Class 10-B', mentor: 'Dr. Rajesh Kumar', riskLevel: 'Medium', email: 'rohit.agarwal@school.edu', phone: '+91 98765 43224', parentContact: '+91 98765 43225' }
  };

  const fallbackStudent = { id: "STU001", name: "Ravi Sharma", class: "12-A", mentor: "Dr. Anjali Verma", riskLevel: "medium", email: "ravi.sharma@school.edu", phone: "+91 98765 43210", parentContact: "+91 98765 43211" };
  const studentData = selectedId && studentDirectory[selectedId] ? studentDirectory[selectedId] : fallbackStudent;

  // Mock attendance data
  const attendanceData = [
    { date: "Oct 1", attendance: 100 },
    { date: "Oct 2", attendance: 100 },
    { date: "Oct 3", attendance: 0 },
    { date: "Oct 4", attendance: 100 },
    { date: "Oct 5", attendance: 100 },
    { date: "Oct 8", attendance: 0 },
    { date: "Oct 9", attendance: 100 },
    { date: "Oct 10", attendance: 100 },
    { date: "Oct 11", attendance: 100 },
    { date: "Oct 12", attendance: 0 },
    { date: "Oct 15", attendance: 100 },
    { date: "Oct 16", attendance: 100 },
    { date: "Oct 17", attendance: 100 },
    { date: "Oct 18", attendance: 100 },
    { date: "Oct 19", attendance: 0 },
    { date: "Oct 22", attendance: 100 },
    { date: "Oct 23", attendance: 100 },
    { date: "Oct 24", attendance: 100 },
    { date: "Oct 25", attendance: 100 },
    { date: "Oct 26", attendance: 100 },
    { date: "Oct 29", attendance: 0 },
    { date: "Oct 30", attendance: 100 },
    { date: "Oct 31", attendance: 100 },
    { date: "Nov 1", attendance: 100 },
    { date: "Nov 2", attendance: 100 }
  ];

  const attendancePercentage = 83;

  // Mock score data
  const scoreData = [
    { subject: "Mathematics", score: 78 },
    { subject: "Physics", score: 85 },
    { subject: "Chemistry", score: 72 },
    { subject: "Biology", score: 88 },
    { subject: "English", score: 82 },
    { subject: "Hindi", score: 75 },
    { subject: "Computer Science", score: 92 },
    { subject: "Physical Education", score: 95 }
  ];

  const averageScore = Math.round(scoreData?.reduce((sum, item) => sum + item?.score, 0) / scoreData?.length);

  // Mock fee data
  const feeData = {
    totalFees: 120000,
    paidAmount: 80000,
    outstandingAmount: 40000,
    overdueDays: 15,
    paymentHistory: [
      {
        description: "Tuition Fee - Semester 1",
        amount: 40000,
        dueDate: "2024-08-15",
        status: "paid"
      },
      {
        description: "Laboratory Fee",
        amount: 15000,
        dueDate: "2024-09-01",
        status: "paid"
      },
      {
        description: "Library Fee",
        amount: 5000,
        dueDate: "2024-09-15",
        status: "paid"
      },
      {
        description: "Tuition Fee - Semester 2",
        amount: 40000,
        dueDate: "2024-10-15",
        status: "overdue"
      },
      {
        description: "Activity Fee",
        amount: 20000,
        dueDate: "2024-11-01",
        status: "pending"
      }
    ]
  };

  // Initialize mentoring notes
  useEffect(() => {
    const initialNotes = [
      {
        id: 1,
        mentorName: "Dr. Anjali Verma",
        content: `Had a detailed discussion with Ravi about his recent attendance issues. He mentioned facing some personal challenges at home that are affecting his focus.\n\nAction Plan:\n- Scheduled weekly check-ins\n- Connected him with school counselor\n- Provided additional study materials for missed classes`,
        timestamp: new Date('2024-10-25T10:30:00'),
        type: 'intervention'
      },
      {
        id: 2,
        mentorName: "Dr. Anjali Verma",
        content: `Positive improvement in Mathematics scores after providing extra practice sessions. Ravi showed great enthusiasm during our problem-solving session.\n\nNext Steps:\n- Continue with advanced problem sets\n- Encourage participation in math olympiad`,
        timestamp: new Date('2024-10-20T14:15:00'),
        type: 'progress'
      },
      {
        id: 3,
        mentorName: "Dr. Anjali Verma",
        content: `Concerned about Chemistry lab performance. Ravi seems to struggle with practical applications despite good theoretical knowledge.\n\nRecommendations:\n- Additional lab sessions\n- Pair with lab partner for peer learning\n- Review safety protocols`,
        timestamp: new Date('2024-10-15T16:45:00'),
        type: 'concern'
      }
    ];
    setMentoringNotes(initialNotes);
  }, []);

  // Detect user role from localStorage or URL params
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'student';
    const savedUser = localStorage.getItem('userName') || 'Ravi Sharma';
    setUserRole(savedRole);
    setCurrentUser(savedUser);
  }, []);

  const handleAddNote = (newNote) => {
    setMentoringNotes(prev => [newNote, ...prev]);
  };

  const getBreadcrumbs = () => {
    if (userRole === 'student') {
      return [
        { label: 'My Profile', path: '/student-profile', isActive: true }
      ];
    } else if (userRole === 'mentor') {
      return [
        { label: 'Dashboard', path: '/mentor-dashboard', isActive: false },
        { label: 'Student Profile', path: '/student-profile', isActive: true }
      ];
    } else {
      return [
        { label: 'Dashboard', path: '/admin-dashboard', isActive: false },
        { label: 'Students', path: '/student-profile', isActive: true }
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedNavbar 
        userRole={userRole} 
        userName={currentUser}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumb 
            userRole={userRole}
            customBreadcrumbs={getBreadcrumbs()}
          />
          
          <StudentHeader student={studentData} />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <AttendanceChart 
              attendanceData={attendanceData}
              attendancePercentage={attendancePercentage}
            />
            <ScoreChart 
              scoreData={scoreData}
              averageScore={averageScore}
            />
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <FeeStatus feeData={feeData} />
            <MentoringNotes 
              notes={mentoringNotes}
              onAddNote={handleAddNote}
              userRole={userRole}
              studentName={studentData?.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;