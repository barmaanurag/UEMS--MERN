import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New exam registration', timestamp: '2 minutes ago' },
    { id: 2, message: 'Results published for CS301', timestamp: '1 hour ago' },
    { id: 3, message: 'New error report from faculty', timestamp: '2 hours ago' },
  ]);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  useEffect(() => {
    const interval = setInterval(() => {
      const eventTypes = [
        { message: 'New student registered', type: 'registration' },
        { message: 'Error log received from system', type: 'error' },
        { message: 'Admit card created for student', type: 'admit_card' },
      ];

      const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const newNotification = {
        id: notifications.length + 1,
        message: randomEvent.message,
        timestamp: 'Just now',
      };

      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      setUnreadCount((prevCount) => prevCount + 1);
    }, 120000); 

    return () => clearInterval(interval);
  }, [notifications]);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setUnreadCount(0);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <div className="relative">
          <button
            onClick={handleToggleNotifications}
            className="p-2 hover:bg-gray-100 rounded-full relative"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex flex-col">
                      <span className="text-sm text-gray-800">{notification.message}</span>
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
