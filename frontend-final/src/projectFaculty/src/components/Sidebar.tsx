import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileQuestion, 
  GraduationCap, 
  MessageSquareMore,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'question-papers', label: 'Question Papers', icon: FileQuestion },
    { id: 'grades', label: 'Grades', icon: GraduationCap },
    { id: 'reviews', label: 'Review Requests', icon: MessageSquareMore },
    { id: 'help-desk', label: 'Help Desk', icon: HelpCircle },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold">Faculty Portal</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-6 py-3 hover:bg-blue-700/50 transition-colors ${
                activeView === item.id ? 'bg-white/10 border-l-4 border-white' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
      <motion.div 
        className="absolute bottom-0 w-64 p-6"
        whileHover={{ scale: 1.05 }}
      >
        <button className="w-full flex items-center px-4 py-2 hover:bg-blue-700/50 rounded transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;