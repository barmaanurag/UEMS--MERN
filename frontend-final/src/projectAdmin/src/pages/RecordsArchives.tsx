import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import axios from 'axios';

const RecordsArchives = () => {
  const [activeTab, setActiveTab] = useState('admit-cards');
  const [filters, setFilters] = useState({
    semester: 'all',
    type: 'all',
  });

  const [admitCards, setAdmitCards] = useState([]);
  const [previousQuestions, setPreviousQuestions] = useState([]);

  // Fetch Admit Cards from Backend
  useEffect(() => {
    const fetchAdmitCards = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admit-cards');
        setAdmitCards(response.data);
      } catch (error) {
        console.error('Error fetching admit cards:', error);
      }
    };

    fetchAdmitCards();
  }, []);

  // Fetch Previous Questions from Backend
  useEffect(() => {
    const fetchPreviousQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/previous-questions');
        setPreviousQuestions(response.data);
      } catch (error) {
        console.error('Error fetching previous questions:', error);
      }
    };

    fetchPreviousQuestions();
  }, []);

  // Filter Admit Cards based on selected filters
  const filteredAdmitCards = admitCards.filter((card: any) => {
    const semesterMatch = filters.semester === 'all' || card.semester === parseInt(filters.semester);
    const typeMatch = filters.type === 'all' || card.type.toLowerCase() === filters.type.toLowerCase();
    return semesterMatch && typeMatch;
  });

  // Download Admit Card as PDF
  const handleDownloadAdmitCard = (card: any) => {
    if (!card.verification_status) {
      alert('Verification status not verified. Cannot download admit card.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Admit Card', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Name: ${card.name}`, 20, 40);
    doc.text(`Roll Number: ${card.rollNumber}`, 20, 50);
    doc.text(`Exams Allowed:`, 20, 60);

    card.exams.forEach((exam: string, index: number) => {
      doc.text(`- ${exam}`, 25, 70 + index * 10);
    });

    doc.save(`AdmitCard_${card.rollNumber}.pdf`);
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Records & Archives</h2>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'admit-cards'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('admit-cards')}
            >
              Admit Cards
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'previous-questions'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('previous-questions')}
            >
              Previous Questions
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'admit-cards' ? (
            <div>
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
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  >
                    <option value="all">All Types</option>
                    <option value="regular">Regular</option>
                    <option value="retest">Retest</option>
                  </select>
                </div>
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
                        Semester
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
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
                    {filteredAdmitCards.map((card: any) => (
                      <tr
                        key={card.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">{card.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{card.rollNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{card.semester}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{card.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              card.status === 'Released'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {card.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => handleDownloadAdmitCard(card)}
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
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {previousQuestions.map((question: any) => (
                <div
                  key={question.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold">{question.subject}</h3>
                  <p className="text-gray-600">Code: {question.course_id}</p>
                  <p className="text-gray-600">Year: {question.year}</p>
                  <p className="text-gray-600 mb-4">Semester: {question.semester}</p>
                  <button className="flex items-center text-blue-600 hover:text-blue-900">
                    <Download className="w-5 h-5 mr-2" />
                    Download Paper
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordsArchives;
