import React from 'react';
import { FileDown, Calendar } from 'lucide-react';

function ExamSchedule() {
  const examSchedule = [
    {
      id: 1,
      subject: 'Database Management',
      date: 'March 15, 2024',
      time: '10:00 AM',
      hall: 'A-101',
      seat: '45'
    },
    {
      id: 2,
      subject: 'Software Engineering',
      date: 'March 18, 2024',
      time: '2:00 PM',
      hall: 'B-201',
      seat: '32'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Admit Card Download */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Admit Card</h3>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            <FileDown className="h-5 w-5" />
            <span>Download Admit Card</span>
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Download your admit card for the current semester examinations.
          Make sure to carry a printed copy to the examination hall.
        </p>
      </div>

      {/* Exam Schedule Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Exam Schedule</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hall
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seat No.
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examSchedule.map((exam) => (
                <tr key={exam.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {exam.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exam.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exam.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exam.hall}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exam.seat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ExamSchedule;