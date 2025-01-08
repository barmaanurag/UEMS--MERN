import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { ErrorLog } from '../types';

interface ErrorLogsProps {
  logs: ErrorLog[];
  onClear: () => void;
}

export function ErrorLogs({ logs, onClear }: ErrorLogsProps) {
  const getIcon = (type: ErrorLog['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">System Logs</h3>
        <button
          onClick={onClear}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Clear Logs
        </button>
      </div>
      <div className="space-y-2 max-h-96 overflow-auto">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-2 p-2 border rounded"
          >
            {getIcon(log.type)}
            <div>
              <div className="flex gap-2 text-sm text-gray-600">
                <span>{new Date(log.timestamp).toLocaleString()}</span>
                <span className="font-medium">{log.type.toUpperCase()}</span>
              </div>
              <p className="font-medium">{log.message}</p>
              <p className="text-sm text-gray-600">{log.details}</p>
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <p className="text-center text-gray-500">No logs to display</p>
        )}
      </div>
    </div>
  );
}