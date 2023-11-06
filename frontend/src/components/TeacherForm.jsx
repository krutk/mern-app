import React, { useState } from 'react';
import { addTeacher } from '../api/api';

const TeacherForm = () => {
  const [teacherData, setTeacherData] = useState({
    name: '',
    age: 0,
    image: '',
    sex: ''
  });

  const handleInputChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTeacher(teacherData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={teacherData.name} onChange={handleInputChange} />
      <input type="number" name="age" value={teacherData.age} onChange={handleInputChange} />
      <input type="text" name="sex" value={teacherData.sex} onChange={handleInputChange} />
      <button type="submit">Add Teacher</button>
    </form>
  );
};

export default TeacherForm;
