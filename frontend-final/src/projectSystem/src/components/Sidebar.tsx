import React from 'react';
import { Users, GraduationCap, School } from 'lucide-react';

interface SidebarProps {
  activeTab: 'students' | 'faculty';
  setActiveTab: (tab: 'students' | 'faculty') => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <Users className="w-8 h-8 text-white" />
        <h1 className="text-white text-xl font-bold">System Management</h1>
      </div>
      
      <nav className="space-y-2">
        <button
          onClick={() => setActiveTab('students')}
          className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
            activeTab === 'students' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          Students
        </button>
        
        <button
          onClick={() => setActiveTab('faculty')}
          className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
            activeTab === 'faculty' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <School className="w-5 h-5" />
          Faculty
        </button>
      </nav>
    </div>
  );
}