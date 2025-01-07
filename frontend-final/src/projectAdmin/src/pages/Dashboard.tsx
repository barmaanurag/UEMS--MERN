import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Sample data - replace with actual data from Supabase
  const registrationData = [
    { name: 'Semester 6', registered: 120, pending: 30 },
    { name: 'Semester 4', registered: 150, pending: 20 },
    { name: 'Semester 2', registered: 100, pending: 40 },
  ];

  const paymentData = [
    { name: 'Paid', value: 270 },
    { name: 'Pending', value: 90 },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-3xl font-bold">360</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Registered Students</h3>
          <p className="text-3xl font-bold">270</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pending Registrations</h3>
          <p className="text-3xl font-bold">90</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Registration Status by Semester</h3>
          <BarChart width={500} height={300} data={registrationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="registered" fill="#0088FE" />
            <Bar dataKey="pending" fill="#FF8042" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={paymentData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;