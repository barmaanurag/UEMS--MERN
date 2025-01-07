import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';

function HelpDesk() {
  const [tickets] = useState([
    {
      id: 1,
      issue: 'Unable to download admit card',
      date: '2024-03-01',
      status: 'open',
      response: null
    },
    {
      id: 2,
      issue: 'Payment gateway error during exam registration',
      date: '2024-02-28',
      status: 'resolved',
      response: 'Issue has been fixed. Please try registering again.'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* New Support Ticket Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Technical Issue</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Issue Category</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>Exam Registration</option>
              <option>Result Download</option>
              <option>Payment Issues </option>
              <option>Admit Card</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Describe the technical issue you're experiencing..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Ticket
          </button>
        </form>
      </div>

      {/* Support Tickets Log */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Support Ticket History</h3>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{ticket.issue}</h4>
                  <p className="text-sm text-gray-600">Submitted on {ticket.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  ticket.status === 'open'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {ticket.status}
                </span>
              </div>
              {ticket.response && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Support Response:</span> {ticket.response}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HelpDesk;