import React from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

const StudentsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Students Page</h1>
      <StudentForm />
      <StudentList />
    </div>
  );
};

export default StudentsPage;
