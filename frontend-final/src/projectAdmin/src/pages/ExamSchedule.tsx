import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

const ExamSchedule = () => {
  const exams = [
    {
      id: 1,
      subject: 'Database Systems',
      code: 'CS301',
      date: '2024-03-15',
      time: '10:00 AM',
      hall: 'H101',
      faculty: 'Dr. Smith',
      invigilator: 'Prof. Johnson'
    },
    {
      id: 2,
      subject: 'Computer Networks',
      code: 'CS302',
      date: '2024-03-17',
      time: '2:00 PM',
      hall: 'H102',
      faculty: 'Dr. Brown',
      invigilator: 'Prof. Davis'
    }
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Exam Schedule</h2>
      
      <div className="grid gap-6">
        {exams.map((exam) => (
          <div 
            key={exam.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{exam.subject}</h3>
                <p className="text-gray-600">Code: {exam.code}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Upcoming
              </span>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
                <span>{exam.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <span>{exam.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <span>Hall: {exam.hall}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-2" />
                <span>Faculty: {exam.faculty}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-gray-600">
                <span className="font-medium">Invigilator:</span> {exam.invigilator}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ExamSchedule;