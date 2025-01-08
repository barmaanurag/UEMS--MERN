import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { RegisterModal } from './components/RegisterModal';
import { ErrorLogs } from './components/ErrorLogs';
import { DataFilter } from './components/DataFilter';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Student, Faculty, ErrorLog } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'students' | 'faculty'>('students');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    year: '',
    position: '',
  });

  const addLog = (type: ErrorLog['type'], message: string, details: string = '') => {
    setErrorLogs(prev => [{
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type,
      message,
      details
    }, ...prev]);
  };

  const handleRegister = (data: any) => {
    try {
      if (activeTab === 'students') {
        setStudents([...students, { ...data, id: crypto.randomUUID() }]);
        addLog('info', 'Student registered successfully', `Student ${data.name} has been added to the system`);
      } else {
        setFaculty([...faculty, { ...data, id: crypto.randomUUID() }]);
        addLog('info', 'Faculty member registered successfully', `Faculty member ${data.name} has been added to the system`);
      }
    } catch (error) {
      addLog('error', 'Registration failed', error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const handleRemove = (id: string) => {
    try {
      if (activeTab === 'students') {
        const student = students.find(s => s.id === id);
        setStudents(students.filter(student => student.id !== id));
        addLog('warning', 'Student removed', `Student ${student?.name} has been removed from the system`);
      } else {
        const member = faculty.find(f => f.id === id);
        setFaculty(faculty.filter(member => member.id !== id));
        addLog('warning', 'Faculty member removed', `Faculty member ${member?.name} has been removed from the system`);
      }
    } catch (error) {
      addLog('error', 'Removal failed', error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const filterData = (data: Student[] | Faculty[]) => {
    return data.filter(item => {
      const matchesSearch = filters.search
        ? item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          ('studentId' in item ? item.studentId : item.facultyId)
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        : true;

      const matchesDepartment = filters.department
        ? item.department === filters.department
        : true;

      const matchesYear = filters.year && 'year' in item
        ? item.year === filters.year
        : true;

      const matchesPosition = filters.position && 'position' in item
        ? item.position === filters.position
        : true;

      return matchesSearch && matchesDepartment && matchesYear && matchesPosition;
    });
  };

  const filteredData = activeTab === 'students'
    ? filterData(students)
    : filterData(faculty);

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {activeTab === 'students' ? 'Student Management' : 'Faculty Management'}
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Add {activeTab === 'students' ? 'Student' : 'Faculty'}
          </button>
        </div>

        <DataFilter type={activeTab} onFilterChange={setFilters} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {activeTab === 'students' ? 'Student ID' : 'Faculty ID'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    {activeTab === 'students' ? (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    ) : (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {'studentId' in item ? item.studentId : item.facultyId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {'year' in item ? item.year : item.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ErrorLogs
              logs={errorLogs}
              onClear={() => setErrorLogs([])}
            />
          </div>
        </div>
      </main>

      <RegisterModal
        type={activeTab}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRegister}
      />
    </div>
  );
}

export default App;