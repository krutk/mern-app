import React from 'react';
import SubjectForm from '../components/SubjectForm';

const StudentsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Subject Page</h1>
      <SubjectForm />
    </div>
  );
};

export default StudentsPage;
