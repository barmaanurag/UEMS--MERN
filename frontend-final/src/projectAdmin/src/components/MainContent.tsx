import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ExamRegistration from '../pages/ExamRegistration';
import ExamSchedule from '../pages/ExamSchedule';
import RecordsArchives from '../pages/RecordsArchives';
import DeclareResult from '../pages/DeclareResult';
import ErrorLog from '../pages/ErrorLog';

const MainContent = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registration" element={<ExamRegistration />} />
        <Route path="/schedule" element={<ExamSchedule />} />
        <Route path="/records" element={<RecordsArchives />} />
        <Route path="/results" element={<DeclareResult />} />
        <Route path="/errors" element={<ErrorLog />} />
      </Routes>
    </main>
  );
}

export default MainContent;