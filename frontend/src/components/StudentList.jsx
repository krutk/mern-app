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
        console.log("data--->", data);
        const sortedStudents = data.sort((a, b) => parseInt(a.class, 10) - parseInt(b.class, 10));
        setStudents(sortedStudents);
        setFilteredStudents(sortedStudents);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    filterStudentsByName(searchTerm);
  };

  const filterStudentsByName = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredStudents(filtered);
    }
  };

  return (
    <div className="py-8">
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
              {/* <div className='flex'> */}

              {student.image && <div className="flex -space-x-2 overflow-hidden">
        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={student.image} alt={`Image of ${student.name}`} />
        </div>}
              {/* </div> */}
              <h2 className="text-lg font-semibold mb-2">{student.name}</h2>
              <p>Class: {student.class}</p>
              <p>Roll Number: {student.rollNumber}</p>
              {/* {student.image && (
                <img src={student.image} alt={`Image of ${student.name}`} className="mt-4 w-full rounded-lg" />
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
