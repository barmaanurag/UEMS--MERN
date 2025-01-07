import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import MainContent from './components/MainContent.tsx';
import Header from './components/Header.tsx';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <MainContent />
        </div>
      </div>
    </Router>
  );
}

export default App;