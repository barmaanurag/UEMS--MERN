import React from "react";
import "tailwindcss/tailwind.css";
import { FaTachometerAlt, FaEdit, FaGraduationCap, FaCalendarCheck, FaSignOutAlt, FaFileAlt, FaDownload, FaClipboardList, FaMoneyCheckAlt, FaCalendarAlt, FaHeadset } from "react-icons/fa";

const Sidebar = () => (
  <div className="bg-black text-white w-64 p-6 flex flex-col justify-between">
    <div>
      <div className="flex items-center mb-8">
        <img
          src="https://storage.googleapis.com/a1aa/image/uMpdV7MKtR5NCpdtDEnjjCilz5jwjy7BW4hYV4m1RNJIAu9E.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <span className="text-xl font-bold">Student</span>
        </div>
      </div>
      <nav>
        <a href="/student-dashboard" className="flex items-center mb-4 p-2 rounded hover:bg-gray-800">
          <FaTachometerAlt className="mr-3" />
          <span>Dashboard</span>
        </a>
        <a href="/student-exam-registration" className="flex items-center mb-4 p-2 rounded hover:bg-gray-800">
          <FaEdit className="mr-3" />
          <span>Exam Registration</span>
        </a>
        <a href="/student-grades" className="flex items-center mb-4 p-2 rounded hover:bg-gray-800">
          <FaGraduationCap className="mr-3" />
          <span>Grades</span>
        </a>
        <a href="#" className="flex items-center mb-4 p-2 rounded hover:bg-gray-800">
          <FaCalendarCheck className="mr-3" />
          <span>Review Request</span>
        </a>
        <a href="/student-logout" className="flex items-center mb-4 p-2 rounded hover:bg-gray-800">
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </a>
      </nav>
    </div>
    <div className="text-gray-500 text-sm">&copy; 2023 Academyis App</div>
  </div>
);

const MainContent = () => (
  <div className="flex-1 p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <FaCalendarAlt className="text-gray-500 text-2xl" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <FaFileAlt className="text-yellow-500 text-2xl mr-3" />
          <p className="text-gray-600">Review Answer Sheet</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <FaDownload className="text-blue-500 text-2xl mr-3" />
          <p className="text-gray-600">Download Admit Card</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Results</h2>
        <canvas id="resultsChart"></canvas>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Attendance</h2>
        <canvas id="attendanceChart"></canvas>
      </div>
    </div>

    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Process Timeline</h2>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaClipboardList className="text-blue-500 text-2xl mr-3" />
            <div>
              <p className="font-bold">Last Raised Review</p>
              <p className="text-gray-600">2023-09-15</p>
            </div>
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2.5">
            <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaMoneyCheckAlt className="text-green-500 text-2xl mr-3" />
            <div>
              <p className="font-bold">Fees Payment Status</p>
              <p className="text-gray-600">Completed</p>
            </div>
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    <MainContent />
  </div>
);

export default Dashboard;
