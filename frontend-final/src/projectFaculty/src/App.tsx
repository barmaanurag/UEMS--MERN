import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './views/DashboardView';
import QuestionPaperView from './views/QuestionPaperView';
import GradesView from './views/GradesView';
import ReviewRequestsView from './views/ReviewRequestsView';
import HelpDeskView from './views/HelpDeskView';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'question-papers':
        return <QuestionPaperView />;
      case 'grades':
        return <GradesView />;
      case 'reviews':
        return <ReviewRequestsView />;
      case 'help-desk':
        return <HelpDeskView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;