import React from 'react';
import { 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Download,
  CreditCard
} from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardView() {
  const attendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ['#4F46E5', '#E5E7EB'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const pendingTasks = [
    { id: 1, task: 'Download Admit Card', icon: Download, urgent: true },
    { id: 2, task: 'Complete Payment for Retest', icon: CreditCard, urgent: true },
    
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attendance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Attendance</h3>
            <Clock className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="relative h-48">
            <Doughnut data={attendanceData} options={chartOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-end">
                <span className="text-3xl font-bold text-indigo-600"></span>
                <p className="text-sm text-gray-500"></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pending Tasks Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Pending Tasks</h3>
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center p-3 rounded-lg ${
                  task.urgent ? 'bg-red-50 border border-red-100' : 'bg-gray-50'
                }`}
              >
                <task.icon className={`h-5 w-5 mr-3 ${
                  task.urgent ? 'text-red-500' : 'text-gray-500'
                }`} />
                <span className={`text-sm ${
                  task.urgent ? 'text-red-700 font-medium' : 'text-gray-700'
                }`}>
                  {task.task}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Exams Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Exams</h3>
            <Calendar className="h-5 w-5 text-red-500" />
          </div>
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-indigo-50 rounded-lg"
            >
              <p className="font-semibold text-indigo-900">Database Management</p>
              <p className="text-sm text-indigo-600">March 15, 2024 - 10:00 AM</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-indigo-50 rounded-lg"
            >
              <p className="font-semibold text-indigo-900">Software Engineering</p>
              <p className="text-sm text-indigo-600">March 18, 2024 - 2:00 PM</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Previous Semester Results Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Previous Semester Results</h3>
          <BarChart3 className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="h-64 flex items-end justify-between px-4">
          {[8.5, 7.8, 9.0, 8.2, 8.7].map((grade, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-16"
            >
              <div 
                className="bg-indigo-600 rounded-t transition-all duration-300 hover:bg-indigo-500"
                style={{ height: `${grade * 25}px` }}
              ></div>
              <p className="text-sm text-center mt-2">Sem {index + 1}</p>
              <p className="text-sm text-center font-semibold">{grade}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardView;