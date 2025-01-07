import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Calendar, 
  GraduationCap,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'exam-registration', label: 'Exam Registration', icon: ClipboardList },
  { id: 'exam-schedule', label: 'Exam Schedule', icon: Calendar },
  { id: 'grades', label: 'Grades', icon: GraduationCap },
  { id: 'raise-review', label: 'Raise Review', icon: MessageSquare },
  { id: 'help-desk', label: 'Help Desk', icon: HelpCircle },
];

function Sidebar({ currentView, setCurrentView }) {
  return (
    <div className="w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-lg">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-8 w-8 text-white" />
          <span className="text-xl font-bold">Student Portal</span>
        </div>
      </motion.div>
      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                currentView === item.id
                  ? 'bg-white/10 border-r-4 border-white'
                  : 'hover:bg-white/5'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;