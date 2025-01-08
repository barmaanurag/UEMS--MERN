import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Calendar, 
  Archive, 
  Award, 
  AlertTriangle,
  LogOut 
} from 'lucide-react';

const Sidebar = () => {

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ClipboardList, label: 'Exam Registration', path: '/registration' },
    { icon: Calendar, label: 'Exam Schedule', path: '/schedule' },
    { icon: Archive, label: 'Records & Archives', path: '/records' },
    { icon: Award, label: 'Declare Result', path: '/results' },
    { icon: AlertTriangle, label: 'Error Log', path: '/errors' },
    
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-green-600 to-green-800 text-white shadow-lg transition-all duration-300 ease-in-out">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 hover:bg-green-900 transition-all duration-200 rounded ${
                isActive ? 'bg-green-900 border-l-4 border-white' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button
          className="flex items-center px-6 py-3 hover:bg-green-900 w-full mt-auto transition-all duration-200 rounded-lg"
          onClick={() => (window.location.href = 'http://localhost:3000/choose')}
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
