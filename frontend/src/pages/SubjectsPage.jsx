import React from 'react';
import SubjectForm from '../components/SubjectForm';
import SubjectList from '../components/SubjectList';

const StudentsPage = () => {
  return (
    <div>
      <h1>Subject Page</h1>
      <SubjectForm />
      <SubjectList />
    </div>
  );
};

export default StudentsPage;
