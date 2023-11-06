import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import SubjectsPage from './pages/SubjectsPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/students" element={<StudentsPage/>} />
        <Route path="/teachers" element={<TeachersPage/>} />
        <Route path="/subjects" element={<SubjectsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
