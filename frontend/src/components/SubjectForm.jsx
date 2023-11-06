import React, { useState } from 'react';
import { addSubject } from '../api/api';

const SubjectForm = () => {
  const [subjectData, setSubjectData] = useState({
    name: '',
    class: '',
    languages: []
  });

  const handleInputChange = (e) => {
    setSubjectData({ ...subjectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addSubject(subjectData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={subjectData.name} onChange={handleInputChange} />
      <input type="text" name="class" value={subjectData.class} onChange={handleInputChange} />
      <button type="submit">Add Subject</button>
    </form>
  );
};

export default SubjectForm;
