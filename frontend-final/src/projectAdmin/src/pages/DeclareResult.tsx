import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import axios from 'axios';

const DeclareResult = () => {
  const [filters, setFilters] = useState({
    semester: 'all',
    result_type: 'all',
    status: 'all',
  });

  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch data from the database
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get('/api/students');
        const resultsResponse = await axios.get('/api/results');
        const students = studentsResponse.data;
        const resultData = resultsResponse.data;

        // Join students and results to calculate CGPA and populate results
        const processedResults = resultData.map((result) => {
          const student = students.find((s) => s.student_id === result.student_id);
          const cgpa = result.marks.reduce((sum, mark) => sum + mark, 0) / result.marks.length; // Example CGPA calculation
          return {
            id: result.id,
            name: student.name,
            rollNumber: student.roll_number,
            result_type: result.result_type,
            cgpa: cgpa.toFixed(2),
            semester: result.semester,
            status: result.status,
          };
        });

        setResults(processedResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      return (
        (filters.semester === 'all' || parseInt(filters.semester) === result.semester) &&
        (filters.result_type === 'all' || filters.result_type === result.result_type) &&
        (filters.status === 'all' || filters.status === result.status)
      );
    });
  }, [filters, results]);

  const generatePDF = (result) => {
    const doc = new jsPDF();
    doc.text(`Result for ${result.name}`, 10, 10);
    doc.text(`Roll Number: ${result.rollNumber}`, 10, 20);
    doc.text(`Result Type: ${result.result_type}`, 10, 30);
    doc.text(`CGPA: ${result.cgpa}`, 10, 40);
    doc.text(`Semester: ${result.semester}`, 10, 50);
    doc.text(`Status: ${result.status}`, 10, 60);
    doc.save(`${result.rollNumber}_result.pdf`);
  };

  const bulkExportPDFs = () => {
    filteredResults.forEach((result) => {
      generatePDF(result);
    });
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Declare Results</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">Semester</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.semester}
              onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
            >
              <option value="all">All Semesters</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semester {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">Result Type</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.result_type}
              onChange={(e) => setFilters({ ...filters, result_type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="Regular">Regular</option>
              <option value="Retest">Retest</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="Final">Final</option>
              <option value="Moderated">Moderated</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={bulkExportPDFs}
          >
            Export All to PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CGPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">{result.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.rollNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.result_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.cgpa}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.semester}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        result.status === 'Final'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => generatePDF(result)}
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeclareResult;
