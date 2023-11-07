import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { addStudent, getAllSubjects } from '../api/api';

const StudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    age: 0,
    image: null,
    class: '',
    rollNumber: '',
    subjectsStuding: []
  });

  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getAllSubjects();
        console.log("data-->subjects", data);
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setStudentData({ ...studentData, [e.target.name]: e.target.files[0] });
    } else {
      setStudentData({ ...studentData, [e.target.name]: e.target.value });
    }
  };

  const handleSubjectsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setStudentData({ ...studentData, subjectsStuding: selectedOptions });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (studentData.name.trim() === '') {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (studentData.age <= 0) {
      errors.age = 'Age should be greater than 0';
      isValid = false;
    }

    if (studentData.rollNumber.trim() === '') {
      errors.rollNumber = 'Roll Number is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const uploadImageToCloudinary = async () => {
    if (studentData.image) {
      try {
        const formData = new FormData();
        formData.append('file', studentData.image);
        formData.append('upload_preset', 'dhh-news');
        formData.append("cloud_name", "dexfnfjrx");

        const response = await axios.post('https://api.cloudinary.com/v1_1/dexfnfjrx/image/upload', formData);
        return response.data.url;
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return null;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const imageUrl = await uploadImageToCloudinary();
      if (!studentData.image) {
        try {
          const response = await addStudent({ ...studentData });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      } else if (imageUrl) {
        try {
          const response = await addStudent({
            ...studentData,
            image: imageUrl,
          });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Image upload failed.");
      }
    } else {
      console.log("Form has errors. Please fix them before submitting.");
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className={`block text-gray-700 text-sm font-bold mb-2 ${errors.name ? 'text-red-500' : ''}`} htmlFor="name">
            Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className={`block text-gray-700 text-sm font-bold mb-2 ${errors.age ? 'text-red-500' : ''}`} htmlFor="age">
            Age
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.age ? 'border-red-500' : ''}`}
            id="age"
            type="number"
            placeholder="Age"
            name="age"
            value={studentData.age}
            onChange={handleInputChange}
          />
          {errors.age && <p className="text-red-500 text-xs italic">{errors.age}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
            Class
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="class"
            type="number"
            placeholder="Class"
            name="class"
            max={12}
            min={1}
            value={studentData.class}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className={`block text-gray-700 text-sm font-bold mb-2 ${errors.rollNumber || errors.notUniqueRoll ? 'text-red-500' : ''}`} htmlFor="rollNumber">
            Roll Number
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rollNumber || errors.notUniqueRoll ? 'border-red-500' : ''}`}
            id="rollNumber"
            type="text"
            placeholder="Roll Number"
            name="rollNumber"
            value={studentData.rollNumber}
            onChange={handleInputChange}
          />
          {errors.rollNumber && <p className="text-red-500 text-xs italic">{errors.rollNumber}</p>}
          {errors.notUniqueRoll && <p className="text-red-500 text-xs italic">{errors.notUniqueRoll}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subjectsStuding"
          >
            Subjects Studying
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subjectsStuding"
            name="subjectsStuding"
            multiple
            onChange={handleSubjectsChange}
          >
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
