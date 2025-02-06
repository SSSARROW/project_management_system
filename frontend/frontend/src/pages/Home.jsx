import React from 'react';
import { FaProjectDiagram, FaCheckCircle } from 'react-icons/fa'; 

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
       
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center mb-10">
          SS Group
        </h1>        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Ongoing Projects */}

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center hover:scale-105 transition-transform duration-300 ease-in-out transform hover:bg-blue-50">
            <div className="mr-4">
              <FaProjectDiagram className="text-4xl text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Ongoing Projects</h2>
              <p className="text-3xl font-bold text-gray-700">12</p>
              <p className="text-gray-500">Projects in progress</p>
            </div>
          </div>

          {/* Finished Projects */}

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center hover:scale-105 transition-transform duration-300 ease-in-out transform hover:bg-green-50">
            <div className="mr-4">
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Finished Projects</h2>
              <p className="text-3xl font-bold text-gray-700">8</p>
              <p className="text-gray-500">Projects completed</p>
            </div>
          </div>

          {/* Upcoming Projects */}
          
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center hover:scale-105 transition-transform duration-300 ease-in-out transform hover:bg-yellow-50">
            <div className="mr-4">
              <FaProjectDiagram className="text-4xl text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Projects</h2>
              <p className="text-3xl font-bold text-gray-700">5</p>
              <p className="text-gray-500">Projects planned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
