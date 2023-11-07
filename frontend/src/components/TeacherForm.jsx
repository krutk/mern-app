import React, { useState, useEffect } from "react";
import axios from "axios";
import { addTeacher, getAllSubjects } from "../api/api";

const TeacherForm = () => {
  const [teacherData, setTeacherData] = useState({
    name: "",
    age: 0,
    image: null,
    sex: "",
    subjectsTaught: [],
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
    if (e.target.name === "image") {
      setTeacherData({ ...teacherData, [e.target.name]: e.target.files[0] });
    } else {
      setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
    }
  };

  const handleSubjectsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTeacherData({ ...teacherData, subjectsTaught: selectedOptions });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (teacherData.name.trim() === "") {
      errors.name = "Name is required";
      isValid = false;
    }

    if (teacherData.age <= 0) {
      errors.age = "Age should be greater than 0";
      isValid = false;
    }

    if (teacherData.sex.trim() === "") {
      errors.sex = "Sex is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const uploadImageToCloudinary = async () => {
    if (teacherData.image) {
      try {
        const formData = new FormData();
        formData.append("file", teacherData.image);
        formData.append("upload_preset", "dhh-news");
        formData.append("cloud_name", "dexfnfjrx");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dexfnfjrx/image/upload",
          formData
        );
        return response.data.url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return null;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const imageUrl = await uploadImageToCloudinary();
      if (!teacherData.image) {
        try {
          const response = await addTeacher({ ...teacherData });
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      } else if (imageUrl) {
        try {
          const response = await addTeacher({
            ...teacherData,
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
            value={teacherData.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 ${
              errors.age ? "text-red-500" : ""
            }`}
            htmlFor="age"
          >
            Age
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.age ? "border-red-500" : ""
            }`}
            id="age"
            type="number"
            placeholder="Age"
            name="age"
            value={teacherData.age}
            onChange={handleInputChange}
          />
          {errors.age && (
            <p className="text-red-500 text-xs italic">{errors.age}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 ${
              errors.sex ? "text-red-500" : ""
            }`}
            htmlFor="sex"
          >
            Sex
          </label>
          <select
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.sex ? "border-red-500" : ""
            }`}
            id="sex"
            name="sex"
            value={teacherData.sex}
            onChange={handleInputChange}
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.sex && (
            <p className="text-red-500 text-xs italic">{errors.sex}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subjectsTaught"
          >
            Subjects Taught
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subjectsTaught"
            name="subjectsTaught"
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
            Add Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;
