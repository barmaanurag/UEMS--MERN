import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const ReviewRequestsView = () => {
  const reviewRequests = [
    {
      id: 1,
      student: 'John Doe',
      subject: 'Data Structures',
      currentMarks: 85,
      requestDate: '2024-03-14',
      status: 'Pending',
      reason: 'Calculation error in question 3',
      changes: []
    },
    {
      id: 2,
      student: 'Jane Smith',
      subject: 'Algorithms',
      currentMarks: 78,
      requestDate: '2024-03-13',
      status: 'Approved',
      reason: 'Partial marks for approach',
      changes: [
        { date: '2024-03-14', from: 78, to: 82, reason: 'Awarded partial marks for correct approach' }
      ]
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Review Requests</h1>
      
      <div className="space-y-4">
        {reviewRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{request.student}</h3>
                <p className="text-gray-600">{request.subject}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {request.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Current Marks</p>
                  <p className="font-semibold">{request.currentMarks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Request Date</p>
                  <p className="font-semibold">{request.requestDate}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Reason for Review</p>
                <p className="mt-1">{request.reason}</p>
              </div>

              {request.changes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Change History</h4>
                  {request.changes.map((change, index) => (
                    <div key={index} className="text-sm space-y-1">
                      <p className="text-gray-600">{change.date}</p>
                      <p>Marks updated from {change.from} to {change.to}</p>
                      <p className="text-gray-600">Reason: {change.reason}</p>
                    </div>
                  ))}
                </div>
              )}

              {request.status === 'Pending' && (
                <div className="flex space-x-4 mt-4">
                  <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                  <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewRequestsView;