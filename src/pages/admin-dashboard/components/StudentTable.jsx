import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StudentTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterClass, setFilterClass] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const studentsData = [
    {
      id: 1,
      name: "Ravi Sharma",
      class: "Class 10-A",
      mentor: "Dr. Priya Singh",
      riskLevel: "high",
      attendance: 65,
      lastScore: 72,
      feeStatus: "overdue",
      lastActivity: "2025-09-28"
    },
    {
      id: 2,
      name: "Anjali Verma",
      class: "Class 9-B",
      mentor: "Prof. Arjun Patel",
      riskLevel: "low",
      attendance: 92,
      lastScore: 88,
      feeStatus: "paid",
      lastActivity: "2025-10-02"
    },
    {
      id: 3,
      name: "Vikram Kumar",
      class: "Class 11-A",
      mentor: "Dr. Meera Gupta",
      riskLevel: "medium",
      attendance: 78,
      lastScore: 75,
      feeStatus: "pending",
      lastActivity: "2025-10-01"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      class: "Class 10-B",
      mentor: "Prof. Rajesh Nair",
      riskLevel: "low",
      attendance: 89,
      lastScore: 91,
      feeStatus: "paid",
      lastActivity: "2025-10-03"
    },
    {
      id: 5,
      name: "Amit Joshi",
      class: "Class 12-A",
      mentor: "Dr. Kavita Sharma",
      riskLevel: "high",
      attendance: 58,
      lastScore: 68,
      feeStatus: "overdue",
      lastActivity: "2025-09-25"
    },
    {
      id: 6,
      name: "Pooja Agarwal",
      class: "Class 9-A",
      mentor: "Prof. Suresh Kumar",
      riskLevel: "medium",
      attendance: 81,
      lastScore: 79,
      feeStatus: "paid",
      lastActivity: "2025-10-02"
    },
    {
      id: 7,
      name: "Rohit Mehta",
      class: "Class 11-B",
      mentor: "Dr. Sunita Rao",
      riskLevel: "low",
      attendance: 94,
      lastScore: 85,
      feeStatus: "paid",
      lastActivity: "2025-10-03"
    },
    {
      id: 8,
      name: "Deepika Iyer",
      class: "Class 10-A",
      mentor: "Prof. Manoj Singh",
      riskLevel: "high",
      attendance: 62,
      lastScore: 71,
      feeStatus: "pending",
      lastActivity: "2025-09-30"
    },
    {
      id: 9,
      name: "Karan Malhotra",
      class: "Class 12-B",
      mentor: "Dr. Neha Chopra",
      riskLevel: "medium",
      attendance: 76,
      lastScore: 82,
      feeStatus: "paid",
      lastActivity: "2025-10-01"
    },
    {
      id: 10,
      name: "Priyanka Das",
      class: "Class 9-B",
      mentor: "Prof. Vivek Tiwari",
      riskLevel: "low",
      attendance: 87,
      lastScore: 89,
      feeStatus: "paid",
      lastActivity: "2025-10-02"
    },
    {
      id: 11,
      name: "Sanjay Yadav",
      class: "Class 11-A",
      mentor: "Dr. Rekha Pandey",
      riskLevel: "high",
      attendance: 59,
      lastScore: 66,
      feeStatus: "overdue",
      lastActivity: "2025-09-26"
    },
    {
      id: 12,
      name: "Nisha Bansal",
      class: "Class 10-B",
      mentor: "Prof. Ashok Kumar",
      riskLevel: "medium",
      attendance: 83,
      lastScore: 77,
      feeStatus: "pending",
      lastActivity: "2025-10-01"
    }
  ];

  const getRiskBadge = (riskLevel) => {
    const badges = {
      low: { bg: 'bg-green-100', text: 'text-green-800', label: 'Low Risk' },
      medium: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Medium Risk' },
      high: { bg: 'bg-red-100', text: 'text-red-800', label: 'High Risk' }
    };
    
    const badge = badges?.[riskLevel] || badges?.low;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge?.bg} ${badge?.text}`}>
        {badge?.label}
      </span>
    );
  };

  const getFeeStatusBadge = (status) => {
    const badges = {
      paid: { bg: 'bg-green-100', text: 'text-green-800', label: 'Paid' },
      pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pending' },
      overdue: { bg: 'bg-red-100', text: 'text-red-800', label: 'Overdue' }
    };
    
    const badge = badges?.[status] || badges?.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge?.bg} ${badge?.text}`}>
        {badge?.label}
      </span>
    );
  };

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = studentsData?.filter(student => {
      const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           student?.class?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           student?.mentor?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesRisk = filterRisk === 'all' || student?.riskLevel === filterRisk;
      const matchesClass = filterClass === 'all' || student?.class?.includes(filterClass);
      
      return matchesSearch && matchesRisk && matchesClass;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];
        
        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }
        
        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [studentsData, searchTerm, filterRisk, filterClass, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedStudents?.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredAndSortedStudents?.slice(startIndex, startIndex + studentsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleStudentClick = (studentId) => {
    navigate(`/student-profile?id=${studentId}`);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={16} className="text-gray-400" />;
    }
    return sortConfig?.direction === 'asc' ? 
      <Icon name="ArrowUp" size={16} className="text-blue-600" /> : 
      <Icon name="ArrowDown" size={16} className="text-blue-600" />;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">Student Overview</h3>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e?.target?.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e?.target?.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Classes</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  <span>Student Name</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('class')}
                  className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  <span>Class</span>
                  {getSortIcon('class')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('mentor')}
                  className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  <span>Mentor</span>
                  {getSortIcon('mentor')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('riskLevel')}
                  className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  <span>Risk Level</span>
                  {getSortIcon('riskLevel')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('attendance')}
                  className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  <span>Attendance</span>
                  {getSortIcon('attendance')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('lastScore')}
                  className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  <span>Last Score</span>
                  {getSortIcon('lastScore')}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('feeStatus')}
                  className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  <span>Fee Status</span>
                  {getSortIcon('feeStatus')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedStudents?.map((student) => (
              <tr 
                key={student?.id} 
                className="hover:bg-gray-50 cursor-pointer transition-smooth"
                onClick={() => handleStudentClick(student?.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student?.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student?.class}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student?.mentor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getRiskBadge(student?.riskLevel)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student?.attendance}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student?.lastScore}%</td>
                <td className="px-6 py-4 whitespace-nowrap">{getFeeStatusBadge(student?.feeStatus)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleStudentClick(student?.id);
                    }}
                    iconName="Eye"
                    iconSize={16}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="divide-y divide-gray-200">
          {paginatedStudents?.map((student) => (
            <div 
              key={student?.id} 
              className="p-4 hover:bg-gray-50 cursor-pointer transition-smooth"
              onClick={() => handleStudentClick(student?.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{student?.name}</h4>
                    <p className="text-xs text-gray-500">{student?.class}</p>
                  </div>
                </div>
                {getRiskBadge(student?.riskLevel)}
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Mentor:</span>
                  <p className="font-medium text-gray-900">{student?.mentor}</p>
                </div>
                <div>
                  <span className="text-gray-500">Attendance:</span>
                  <p className="font-medium text-gray-900">{student?.attendance}%</p>
                </div>
                <div>
                  <span className="text-gray-500">Last Score:</span>
                  <p className="font-medium text-gray-900">{student?.lastScore}%</p>
                </div>
                <div>
                  <span className="text-gray-500">Fee Status:</span>
                  <div className="mt-1">{getFeeStatusBadge(student?.feeStatus)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + studentsPerPage, filteredAndSortedStudents?.length)} of {filteredAndSortedStudents?.length} students
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconSize={16}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconSize={16}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;