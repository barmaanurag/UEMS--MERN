import React from 'react';
import { Users, GraduationCap } from 'lucide-react';

export function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onTabChange('students')}
        className={`flex items-center px-4 py-2 rounded-lg ${
          activeTab === 'students'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <GraduationCap className="h-5 w-5 mr-2" />
        Students
      </button>
      <button
        onClick={() => onTabChange('faculty')}
        className={`flex items-center px-4 py-2 rounded-lg ${
          activeTab === 'faculty'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Users className="h-5 w-5 mr-2" />
        Faculty
      </button>
    </div>
  );
}
