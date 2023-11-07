import React, { useState, useEffect } from "react";
import { getAllStudents } from "../api/api"; // API function for fetching student data

const StudentSubjectTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Students and their Subjects</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">Class</th>
            <th className="border border-gray-300 px-4 py-2">Roll Number</th>
            <th className="border border-gray-300 px-4 py-2">Subject</th>
            <th className="border border-gray-300 px-4 py-2">Teacher</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border border-gray-300 px-4 py-2">{student?.name}</td>
              <td className="border border-gray-300 px-4 py-2">{student?.age}</td>
              <td className="border border-gray-300 px-4 py-2">{student?.class}</td>
              <td className="border border-gray-300 px-4 py-2">{student?.rollNumber}</td>
              <td className="border border-gray-300 px-4 py-2">
                {student?.subjectsStuding.map((subject) => (
                  <div key={subject._id}>
                    {subject?.name} <br />
                    {subject?.languages.length > 0 && <div className="text-xs">Languages: {subject?.languages.join(", ")}</div>}
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student?.subjectsStuding.map((subject) => (
                  subject?.teacherTeaching?.name && <div key={subject._id}>
                    {subject?.teacherTeaching?.name} (Age: {subject?.teacherTeaching?.age})
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSubjectTable;
