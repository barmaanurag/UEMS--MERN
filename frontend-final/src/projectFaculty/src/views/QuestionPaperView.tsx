import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Clock, CheckCircle, History } from 'lucide-react';

const QuestionPaperView = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedSubject || !file) {
      setMessage('Please select a subject and upload a file.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('subject', selectedSubject);
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const papers = [
    {
      subject: 'Data Structures',
      status: 'Final',
      lastModified: '2024-03-15',
      changes: [
        { date: '2024-03-15', description: 'Final approval received' },
        { date: '2024-03-14', description: 'Incorporated reviewer feedback' },
      ],
    },
    {
      subject: 'Algorithms',
      status: 'Under Review',
      lastModified: '2024-03-14',
      changes: [
        { date: '2024-03-14', description: 'Submitted for review' },
        { date: '2024-03-13', description: 'Initial draft created' },
      ],
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Question Papers</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Upload New Question Paper</h2>
        <div className="space-y-4">
          <select
            className="w-full p-2 border rounded"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Database Systems">Database Systems</option>
          </select>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">Drop your file here or click to upload</p>
            </label>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Submit for Review'}
          </button>
          {message && <p className="text-sm text-red-500">{message}</p>}
        </div>
      </div>

      <div className="space-y-4">
        {papers.map((paper) => (
          <div key={paper.subject} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{paper.subject}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  paper.status === 'Final'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {paper.status}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                Last modified: {paper.lastModified}
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <History className="w-4 h-4 mr-2" />
                  Change Log
                </h4>
                <div className="space-y-2">
                  {paper.changes.map((change, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <span className="text-gray-500 w-24">{change.date}</span>
                      <span>{change.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPaperView;
