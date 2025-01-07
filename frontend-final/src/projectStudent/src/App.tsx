import React , { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ExamRegistration from './components/ExamRegistration';
import ExamSchedule from './components/ExamSchedule';
import Grades from './components/Grades';
import RaiseReview from './components/RaiseReview';
import HelpDesk from './components/HelpDesk';
import Notifications from './components/Notifications';
import { Bell } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'exam-registration':
        return <ExamRegistration />;
      case 'exam-schedule':
        return <ExamSchedule />;
      case 'grades':
        return <Grades />;
      case 'raise-review':
        return <RaiseReview />;
      case 'help-desk':
        return <HelpDesk />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800"></h1>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              {showNotifications && <Notifications />}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;