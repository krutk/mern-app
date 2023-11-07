import React, { useState, useEffect } from "react";
import axios from "axios";
import { addSubject, getAllTeachers } from "../api/api";

const SubjectForm = () => {
  const [subjectData, setSubjectData] = useState({
    name: "",
    class: "",
    languages: [],
    teacherTeaching: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getAllTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleInputChange = (e) => {
    setSubjectData({ ...subjectData, [e.target.name]: e.target.value });
  };

  const handleLanguagesChange = (e) => {
    const selectedLanguages = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSubjectData({ ...subjectData, languages: selectedLanguages });
  };

  const handleTeacherChange = (e) => {
    setSubjectData({ ...subjectData, teacherTeaching: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (subjectData.name.trim() === "") {
      errors.name = "Name is required";
      isValid = false;
    }

    if (subjectData.class.trim() === "") {
      errors.class = "Class is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await addSubject(subjectData);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Form has errors. Please fix them before submitting.");
    }
  };

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 ${
              errors.name ? "text-red-500" : ""
            }`}
            htmlFor="name"
          >
            Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={subjectData.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 ${
              errors.class ? "text-red-500" : ""
            }`}
            htmlFor="class"
          >
            Class
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.class ? "border-red-500" : ""
            }`}
            id="class"
            type="text"
            placeholder="Class"
            name="class"
            value={subjectData.class}
            onChange={handleInputChange}
          />
          {errors.class && (
            <p className="text-red-500 text-xs italic">{errors.class}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="languages"
          >
            Languages
          </label>
          <select
            multiple
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="languages"
            name="languages"
            value={subjectData.languages}
            onChange={handleLanguagesChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="teacher"
          >
            Teacher
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="teacher"
            name="teacherTeaching"
            value={subjectData.teacherTeaching}
            onChange={handleTeacherChange}
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Subject
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubjectForm;
