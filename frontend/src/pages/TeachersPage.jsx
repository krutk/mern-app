import React from 'react';
import TeacherForm from '../components/TeacherForm';

const TeachersPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Teacher Page</h1>
      <TeacherForm />
    </div>
  );
};

export default TeachersPage;
