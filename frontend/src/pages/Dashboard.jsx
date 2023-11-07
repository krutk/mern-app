import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">School Management System</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manage Students</h2>
            <a href="/students" className="mt-4 block text-blue-500 hover:underline">Go to Students</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manage Teachers</h2>
            <a href="/teachers" className="mt-4 block text-blue-500 hover:underline">Go to Teachers</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manage Subjects</h2>
            <a href="/subjects" className="mt-4 block text-blue-500 hover:underline">Go to Subjects</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Subjects of Student and their Teachers</h2>
            <a href="/lists" className="mt-4 block text-blue-500 hover:underline">Go to Page</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
