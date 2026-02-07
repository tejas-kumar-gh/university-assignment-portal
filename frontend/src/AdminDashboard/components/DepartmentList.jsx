import React from 'react';
import DepartmentCard from './DepartmentCard';

const DepartmentList = ({ 
  departments, 
  usercount, 
  searchTerm, 
  filterType, 
  editingId, 
  editForm, 
  onSearchChange, 
  onFilterChange, 
  onStartEdit, 
  onDelete, 
  onEditChange, 
  onUpdate, 
  onCancelEdit 
}) => {
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.departmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || dept.programType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Departments List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <input
            type="text"
            placeholder="Search departments by name or description..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg"
          />
        </div>
        
        <div>
          <select
            value={filterType}
            onChange={onFilterChange}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg bg-white"
          >
            <option value="all">All Program Types</option>
            <option value="engineering">Engineering</option>
            <option value="UG">Undergraduate (UG)</option>
            <option value="PG">Postgraduate (PG)</option>
            <option value="Research">Research</option>
             <option value="diploma">Diploma</option>
             <option value=""></option>
          </select>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800 font-semibold">
          Showing {filteredDepartments.length} of {departments.length} departments
          {searchTerm && ` for "${searchTerm}"`}
          {filterType !== "all" && ` in ${filterType}`}
        </p>
      </div>

      {filteredDepartments.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">No Departments Found</h3>
          <p className="text-gray-500 text-lg">
            {departments.length === 0 
              ? "Get started by adding your first department." 
              : "No departments match your search criteria."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDepartments.map((dept) => (
            <DepartmentCard
              key={dept._id}
              dept={dept}
              userCount={usercount}
              isEditing={editingId === dept._id}
              editForm={editForm}
              onStartEdit={onStartEdit}
              onDelete={onDelete}
              onEditChange={onEditChange}
              onUpdate={onUpdate}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentList;