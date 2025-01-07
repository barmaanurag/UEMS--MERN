import React from 'react';

const notifications = [
  {
    id: 1,
    title: 'Exam Registration Open',
    message: 'Registration for Spring 2024 exams is now open',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    title: 'Assignment Due',
    message: 'Database Management System assignment due tomorrow',
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    title: 'Result Published',
    message: 'Fall 2023 semester results have been published',
    timestamp: '1 day ago',
  },
];

function Notifications() {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <h4 className="text-sm font-semibold text-gray-800">{notification.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Notifications;