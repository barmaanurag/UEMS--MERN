import React from 'react';
import { Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const HelpDeskView = () => {
  const tickets = [
    {
      id: 1,
      issue: 'Unable to upload question paper',
      category: 'Technical',
      status: 'Open',
      priority: 'High',
      date: '2024-03-15',
      updates: [
        { date: '2024-03-15', message: 'Issue reported' }
      ]
    },
    {
      id: 2,
      issue: 'Grades export not working',
      category: 'Technical',
      status: 'In Progress',
      priority: 'Medium',
      date: '2024-03-14',
      updates: [
        { date: '2024-03-14', message: 'Issue reported' },
        { date: '2024-03-15', message: 'Under investigation by IT team' }
      ]
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Help Desk</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Report New Issue</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Issue Category</label>
            <select className="w-full p-2 border rounded">
              <option>Technical</option>
              <option>Access Related</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select className="w-full p-2 border rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Describe your issue..."
            ></textarea>
          </div>
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Submit Ticket
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{ticket.issue}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {ticket.status}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium">{ticket.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Priority</p>
                <p className={`font-medium ${
                  ticket.priority === 'High' ? 'text-red-600' :
                  ticket.priority === 'Medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>{ticket.priority}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date Reported</p>
                <p className="font-medium">{ticket.date}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Updates</h4>
              <div className="space-y-2">
                {ticket.updates.map((update, index) => (
                  <div key={index} className="flex items-start text-sm">
                    <Clock className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                    <div>
                      <p className="text-gray-600">{update.date}</p>
                      <p>{update.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpDeskView;