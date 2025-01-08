import React from 'react';
import { motion } from 'framer-motion';
import { Book, Users, FileCheck } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardView = () => {
  const subjects = [
    { name: 'Data Structures', attendance: 85, papers: 'Submitted', avgScore: 78 },
    { name: 'Algorithms', attendance: 78, papers: 'Under Review', avgScore: 82 },
    { name: 'Database Systems', attendance: 92, papers: 'Final', avgScore: 75 },
  ];

  const performanceData = {
    labels: subjects.map(s => s.name),
    datasets: [
      {
        label: 'Average Score',
        data: subjects.map(s => s.avgScore),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  };

  const attendanceData = {
    labels: subjects.map(s => s.name),
    datasets: [
      {
        label: 'Attendance %',
        data: subjects.map(s => s.attendance),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Class Performance Overview',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {subjects.map((subject) => (
          <motion.div
            key={subject.name}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{subject.name}</h3>
              <Book className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-500 mr-2" />
                  <span>Attendance</span>
                </div>
                <span className="font-semibold">{subject.attendance}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileCheck className="w-5 h-5 text-gray-500 mr-2" />
                  <span>Question Paper</span>
                </div>
                <span className={`font-semibold ${
                  subject.papers === 'Final' ? 'text-green-500' : 
                  subject.papers === 'Under Review' ? 'text-yellow-500' : 
                  'text-blue-500'
                }`}>{subject.papers}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <Line options={chartOptions} data={performanceData} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <Bar options={chartOptions} data={attendanceData} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardView;