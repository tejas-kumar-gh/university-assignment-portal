
import React from 'react';

const DepartmentCard = ({ 
  dept, 
  userCount, 
  isEditing, 
  editForm, 
  onStartEdit, 
  onDelete, 
  onEditChange, 
  onUpdate, 
  onCancelEdit 
}) => {
  const currentUserCount = userCount.find((u) => u._id === dept._id)?.userCount ?? 0;

  if (isEditing) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border-2 border-blue-500 shadow-xl transition-all duration-300">
        <div className="space-y-4">
          <input
            type="text"
            name="departmentName"
            value={editForm.departmentName}
            onChange={onEditChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-lg font-bold"
            placeholder="Department Name"
          />
          
          <select
            name="programType"
            value={editForm.programType}
            onChange={onEditChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-lg bg-white"
          >
            <option value="Engineering">Engineering</option>
            <option value="UG">Undergraduate (UG)</option>
            <option value="PG">Postgraduate (PG)</option>
            <option value="Research">Research</option>
            <option value="UG_PG">UG & PG</option>
            <option value="All">All Programs</option>
          </select>

          <textarea
            name="description"
            value={editForm.description}
            onChange={onEditChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-lg resize-none"
            placeholder="Department Description"
            rows="3"
          />

          <div className="flex space-x-3">
            <button
              onClick={() => onUpdate(dept._id)}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <h3 className="text-2xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {dept.departmentName}
      </h3>

      <div className="flex items-center mb-3">
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {dept.programType}
        </span>
      </div>

      <div className="flex items-center mb-4">
        <span className="text-lg font-semibold text-gray-700">
          Users Enrolled:{" "}
          <span className="text-2xl font-bold text-green-600">
            {currentUserCount}
          </span>
        </span>
      </div>

      {dept.description && (
        <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
          {dept.description}
        </p>
      )}

      <div className="flex space-x-3">
        <button
          onClick={() => onStartEdit(dept)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(dept._id)}
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;