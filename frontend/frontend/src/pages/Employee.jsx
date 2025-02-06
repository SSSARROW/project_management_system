import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';



const Employee = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    localAddress: '',
    permanentAddress: '',
    designation: '',
    joinDate: '',
    salary: '',
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    setNewEmployee({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      phone: '',
      localAddress: '',
      permanentAddress: '',
      designation: '',
      joinDate: '',
      salary: '',
    });
    setShowAddForm(false);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee(employee);
    setShowAddForm(true);
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    setEmployees(
      employees.map((emp) => (emp.id === editingEmployee.id ? newEmployee : emp))
    );
    setNewEmployee({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      phone: '',
      localAddress: '',
      permanentAddress: '',
      designation: '',
      joinDate: '',
      salary: '',
    });
    setEditingEmployee(null);
    setShowAddForm(false);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Employee Management</h1>
      <p className="mb-4 text-center">Manage employee records, their details, and performance.</p>
      <div className="flex justify-center mb-4">
        <button
          className="addbutton bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus className="inline mr-2" /> Add Employee
        </button>
      </div>


      <div className="flex justify-center items-center mb-4">
  <input
    type="text"
    placeholder="Search by name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full md:w-1/2 px-3 text-center py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className=" leading-6 text-2xl font-bold text-blue-800">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h3>
              <form
                onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                className="mt-2 text-left"
              >
                {/* Personal Details Card */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                  <div className="border-b p-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                        1
                      </span>
                      Personal Details
                    </h2>
                  </div>
                  <div className="p-6 grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={newEmployee.fullName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={newEmployee.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          name="gender"
                          value={newEmployee.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={newEmployee.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={newEmployee.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1"> Address</label>
                      <input
                        type="text"
                        name="localAddress"
                        value={newEmployee.localAddress}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter address"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                  <div className="border-b p-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                        2
                      </span>
                      Company Details
                    </h2>
                  </div>
                  <div className="p-6 grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                        <select
                          name="designation"
                          value={newEmployee.designation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select designation</option>
                          <option value="designation 01">designation 01</option>
                          <option value="designation 02">designation 02</option>
                          <option value="designation 03">designation 03</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                        <input
                          type="date"
                          name="joinDate"
                          value={newEmployee.joinDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                        <input
                          type="number"
                          name="salary"
                          value={newEmployee.salary}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter salary"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="closebutton bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="addbutton bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {editingEmployee ? 'Update Employee' : 'Add Employee'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full border-blue-900">
          <div className="relative top-20 mx-auto p-5  w-full max-w-4xl shadow-lg rounded-md bg-white border-2 border-blue-400">
            <div className="mt-3 text-center">
              <h3 className="text-xl leading-6 font-medium text-blue-900">
                Employee Details
              </h3>
              <div className="mt-2 text-left">
                <p><strong>Name:</strong> {selectedEmployee.fullName}</p>
                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
                <p><strong>Address:</strong> {selectedEmployee.localAddress}</p>
                <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
                <p><strong>Join Date:</strong> {selectedEmployee.joinDate}</p>
                <p><strong>Salary:</strong> {selectedEmployee.salary}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className=" closebutton bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full  border-blue-800 border-0 bg-white  text-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Full Name</th>
              <th className="py-2 px-4 border-b text-left">Designation</th>
              <th className="py-2 px-4 border-b text-left">Join Date</th>
              <th className="py-2 px-4 border-b text-left">Salary</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="py-2 px-4 border-b">{employee.fullName}</td>
                <td className="py-2 px-4 border-b">{employee.designation}</td>
                <td className="py-2 px-4 border-b">{employee.joinDate}</td>
                <td className="py-2 px-4 border-b">{employee.salary}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className=" text-blue-500 px-2 py-1 rounded"
                    onClick={() => handleViewDetails(employee)}
                  >
                    <FaEye className="inline mr-1" /> 
                  </button>
                  <button
                    className="text-yellow-500  px-2 py-1 rounded ml-2"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    <FaEdit className="inline mr-1" /> 
                  </button>
                  <button
                    className="text-red-500  px-2 py-1 rounded ml-2"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    <FaTrash className="inline mr-1" /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
