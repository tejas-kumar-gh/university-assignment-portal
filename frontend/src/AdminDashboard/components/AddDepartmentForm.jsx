import React from 'react';

const AddDepartmentForm = ({ formData, onSubmit, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Add New Department
      </h2>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6" onSubmit={onSubmit}>
          
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
              Department Name *
            </label>
            <input
              type="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={onChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg"
              placeholder="Enter department name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
              Program Type *
            </label>
            <select
              name="programType"
              value={formData.programType}
              onChange={onChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg bg-white"
              required
            >
              <option value="UG_PG">Engineering</option>
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
              <option value="Research">Research</option>
              <option value="UG_PG">UG & PG</option>
              <option value="All">All Programs</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg resize-none"
              placeholder="Enter department description"
              rows="5"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentForm;