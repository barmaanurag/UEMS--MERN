import React, { useState } from 'react';
import { MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';

function RaiseReview() {
  const [reviewRequests] = useState([
    {
      id: 1,
      subject: 'Database Management',
      date: '2024-03-01',
      status: 'pending',
      response: null
    },
    {
      id: 2,
      subject: 'Software Engineering',
      date: '2024-02-28',
      status: 'completed',
      response: 'Grade updated from B to B+'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* New Review Request Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Raise New Review Request</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>Database Management</option>
              <option>Software Engineering</option>
              <option>Computer Networks</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reason for Review</label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Explain why you're requesting a review..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Request
          </button>
        </form>
      </div>

      {/* Review Requests Log */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Request Log</h3>
        <div className="space-y-4">
          {reviewRequests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{request.subject}</h4>
                  <p className="text-sm text-gray-600">Submitted on {request.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {request.status}
                </span>
              </div>
              {request.response && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Response:</span> {request.response}
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
export default RaiseReview;