export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  year: string;
  course: string;
  phone: string;
  address: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  facultyId: string;
  department: string;
  position: string;
  specialization: string;
  phone: string;
  joinDate: string;
  qualification: string;
}

export interface ErrorLog {
  id: string;
  timestamp: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  details: string;
}