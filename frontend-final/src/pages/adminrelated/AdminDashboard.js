// src/pages/adminrelated/AdminDashboard.js
import React, { useState } from 'react';
import { TabNavigation } from './TabNavigation';
import { AddUserForm } from './AddUserForm';
import { UserList } from './UserList';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('students'); // 'students' or 'faculty'
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedUser(null); // Clear selected user when switching tabs
  };

  const handleAddUser = (newUser) => {
    const id = Date.now().toString();
    setUsers([...users, { id, ...newUser }]);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null); // Deselect user if deleted
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = users.filter((user) => user.role === activeTab);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      <AddUserForm onAddUser={handleAddUser} defaultRole={activeTab} />
      
      {selectedUser && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold">Selected User</h3>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Department:</strong> {selectedUser.department}</p>
        </div>
      )}

      <UserList
        users={filteredUsers}
        onDeleteUser={handleDeleteUser}
        onSelectUser={handleSelectUser}
        showStudentActions={activeTab === 'students'}
      />
    </div>
  );
}

export default AdminDashboard;  // Use default export
