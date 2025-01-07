import React, { useState } from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Exam } from '../types';
import { PaymentForm } from './PaymentForm';

const MOCK_EXAMS: Exam[] = [
  { id: '1', name: 'Mid Semester Examination', date: '2024-04-15', fee: 1000, registered: false },
  { id: '2', name: 'Final Semester Examination', date: '2024-05-20', fee: 1500, registered: false }
];

const MOCK_RETEST_EXAMS: Exam[] = [
  { 
    id: '3', 
    name: 'Data Structures', 
    date: '2024-04-20', 
    fee: 500, 
    registered: false,
    isRetest: true 
  },
  { 
    id: '4', 
    name: 'Computer Networks', 
    date: '2024-04-22', 
    fee: 500, 
    registered: false,
    isRetest: true 
  }
];

export function ExamRegistration({ onBack }: { onBack: () => void }) {
  const [exams, setExams] = useState<Exam[]>(MOCK_EXAMS);
  const [retestExams, setRetestExams] = useState<Exam[]>(MOCK_RETEST_EXAMS);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleRegister = (exam: Exam) => {
    setSelectedExam(exam);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    if (selectedExam) {
      if (selectedExam.isRetest) {
        setRetestExams(exams => exams.map(exam => 
          exam.id === selectedExam.id ? { ...exam, registered: true } : exam
        ));
      } else {
        setExams(exams => exams.map(exam => 
          exam.id === selectedExam.id ? { ...exam, registered: true } : exam
        ));
      }
    }
    setShowPayment(false);
    setSelectedExam(null);
  };

  if (showPayment && selectedExam) {
    return (
      <PaymentForm
        examName={selectedExam.name}
        amount={selectedExam.fee}
        onBack={() => setShowPayment(false)}
        onComplete={handlePaymentComplete}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
  
      
      <h2 className="text-2xl font-bold mb-6">Regular Exams</h2>
      <div className="space-y-4 mb-8">
        {exams.map(exam => (
          <div key={exam.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{exam.name}</h3>
                <p className="text-gray-600">Date: {exam.date}</p>
                <p className="text-gray-600">Fee: ₹{exam.fee}</p>
              </div>
              <button
                onClick={() => handleRegister(exam)}
                disabled={exam.registered}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  exam.registered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {exam.registered ? 'Registered' : 'Register & Pay'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Retest Exams</h2>
      <div className="space-y-4">
        {retestExams.map(exam => (
          <div key={exam.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{exam.name}</h3>
                <p className="text-gray-600">Date: {exam.date}</p>
                <p className="text-gray-600">Fee: ₹{exam.fee}</p>
              </div>
              <button
                onClick={() => handleRegister(exam)}
                disabled={exam.registered}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  exam.registered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {exam.registered ? 'Registered' : 'Register & Pay'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ExamRegistration;