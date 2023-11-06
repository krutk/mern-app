import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../api/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredStudents(filtered);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by student name"
          className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStudents.map(student => (
            <div key={student.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">{student.name}</h2>
              <p>Class: {student.class}</p>
              <p>Roll Number: {student.rollNumber}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
