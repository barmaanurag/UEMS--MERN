import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GradesView = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedCgpa, setSelectedCgpa] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', subject: 'Data Structures', marks: 85, cgpa: 3.8 },
    { id: 2, name: 'Jane Smith', subject: 'Data Structures', marks: 92, cgpa: 4.0 },
    { id: 3, name: 'Mike Johnson', subject: 'Algorithms', marks: 78, cgpa: 3.2 },
    { id: 4, name: 'Emily Davis', subject: 'Algorithms', marks: 88, cgpa: 3.7 },
    { id: 5, name: 'Chris Lee', subject: 'Operating Systems', marks: 80, cgpa: 3.5 },
    { id: 6, name: 'Anna Taylor', subject: 'Operating Systems', marks: 95, cgpa: 4.0 },
    { id: 7, name: 'David Brown', subject: 'Databases', marks: 70, cgpa: 2.9 },
    { id: 8, name: 'Sophia Wilson', subject: 'Databases', marks: 89, cgpa: 3.6 },
  ]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedMarks, setEditedMarks] = useState('');

  // Filtering logic
  const filteredStudents = students.filter((student) => {
    const matchesSubject =
      selectedSubject === 'all' || student.subject === selectedSubject;
    const matchesCgpa =
      selectedCgpa === 'all' ||
      (selectedCgpa === 'above3.5' && student.cgpa > 3.5) ||
      (selectedCgpa === 'above3.0' && student.cgpa > 3.0) ||
      (selectedCgpa === 'below3.0' && student.cgpa < 3.0);
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSubject && matchesCgpa && matchesSearch;
  });

  // Export filtered data as PDF
  const handleExport = () => {
    const doc = new jsPDF();
    doc.text('Student CGPA Report', 14, 10);

    const tableData = filteredStudents.map((student) => [
      student.name,
      student.subject,
      student.marks,
      student.cgpa.toFixed(2),
    ]);

    doc.autoTable({
      head: [['Name', 'Subject', 'Marks', 'CGPA']],
      body: tableData,
    });

    doc.save('Filtered_Student_CGPA.pdf');
  };

  // Handle editing marks
  const handleEdit = (studentId, marks) => {
    setEditingStudentId(studentId);
    setEditedMarks(marks);
  };

  const handleSave = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              marks: Number(editedMarks),
              cgpa: (Number(editedMarks) / 100) * 4.0, // Recalculate CGPA
            }
          : student
      )
    );
    setEditingStudentId(null);
    setEditedMarks('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student CGPA Report</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">All Subjects</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Algorithms">Algorithms</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="Databases">Databases</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CGPA Range</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedCgpa}
              onChange={(e) => setSelectedCgpa(e.target.value)}
            >
              <option value="all">All CGPA</option>
              <option value="above3.5">Above 3.5</option>
              <option value="above3.0">Above 3.0</option>
              <option value="below3.0">Below 3.0</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                className="w-full p-2 border rounded pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            <span className="font-medium">Filter Results</span>
          </div>
          <button
            className="flex items-center text-blue-500 hover:text-blue-600"
            onClick={handleExport}
          >
            <Download className="w-5 h-5 mr-1" />
            Export
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CGPA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingStudentId === student.id ? (
                    <input
                      type="number"
                      value={editedMarks}
                      onChange={(e) => setEditedMarks(e.target.value)}
                      className="w-16 p-1 border rounded"
                    />
                  ) : (
                    student.marks
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.cgpa.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {editingStudentId === student.id ? (
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={() => handleSave(student.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => handleEdit(student.id, student.marks)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradesView;
