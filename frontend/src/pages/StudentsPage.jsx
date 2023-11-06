import React from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

const StudentsPage = () => {
  return (
    <div>
      <h1>Students Page</h1>
      <StudentForm />
      <StudentList />
    </div>
  );
};

export default StudentsPage;
