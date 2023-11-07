import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${baseURL}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${baseURL}/students`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error.response.data.message);
    throw error.response.data.message;
  }
};

export const getAllTeachers = async () => {
  try {
    const response = await axios.get(`${baseURL}/teachers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};

export const addTeacher = async (teacherData) => {
  try {
    const response = await axios.post(`${baseURL}/teachers`, teacherData);
    return response.data;
  } catch (error) {
    console.error('Error adding teacher:', error);
    throw error;
  }
};

export const getAllSubjects = async () => {
  try {
    const response = await axios.get(`${baseURL}/subjects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

export const addSubject = async (subjectData) => {
  try {
    const response = await axios.post(`${baseURL}/subjects`, subjectData);
    return response.data;
  } catch (error) {
    console.error('Error adding subject:', error);
    throw error;
  }
};

