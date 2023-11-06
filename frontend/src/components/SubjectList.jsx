import React, { useState, useEffect } from 'react';
import { getAllSubjects } from '../api/api';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSubjects();
        setSubjects(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Subject List</h2>
      <ul>
        {subjects.map(subject => (
          <li key={subject._id}>{subject.name} - {subject.class}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;
