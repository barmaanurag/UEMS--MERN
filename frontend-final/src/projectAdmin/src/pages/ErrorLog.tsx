import React, { useState } from 'react';
import { AlertTriangle, Clock, User } from 'lucide-react';

const ErrorLog = () => {
  const [filters, setFilters] = useState({
    userType: 'all',
    priority: 'all',
    status: 'all'
  });

  const errors = [
    {
      id: 1,
      message: 'Unable to access exam registration',
      userType: 'Student',
      userId: '2024001',
      priority: 'High',
      status: 'Pending',
      timestamp: '2024-03-10 14:30'
    },
    {
      id: 2,
      message: 'Error in uploading marks',
      userType: 'Faculty',
      userId: 'FAC001',
      priority: 'Medium',
      status: 'Resolved',
      timestamp: '2024-03-09 16:45'
    }
  ];

  const filteredErrors = errors.filter((error) => {
    const matchesUserType = filters.userType === 'all' || error.userType.toLowerCase() === filters.userType;
    const matchesPriority = filters.priority === 'all' || error.priority.toLowerCase() === filters.priority;
    const matchesStatus = filters.status === 'all' || error.status.toLowerCase() === filters.status;
    return matchesUserType && matchesPriority && matchesStatus;
  });

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Error Log</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">User Type</label>
            <select 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.userType}
              onChange={(e) => setFilters({...filters, userType: e.target.value})}
            >
              <option value="all">All Users</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredErrors.map((error) => (
            <div 
              key={error.id}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`w-5 h-5 ${
                    error.priority === 'High' ? 'text-red-500' :
                    error.priority === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{error.message}</p>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {error.userType} ({error.userId})
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {error.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  error.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {error.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ErrorLog;
