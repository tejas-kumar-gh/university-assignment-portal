import React from 'react';

const Sidebar = ({ activeSection, onSectionChange, onDepartmentView, onUserView }) => {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', color: 'blue' },
    { id: 'departments', label: '🏛️ Departments', color: 'blue', action: onDepartmentView },
    { id: 'addDepartment', label: '➕ Add Department', color: 'green' },
    { id: 'users', label: '👥 Users', color: 'blue', action: onUserView },  // <-- FIXED
    { id: 'addUser', label: '👤 Add User', color: 'green' }
  ];

  return (
    <div className="w-full lg:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => item.action ? item.action() : onSectionChange(item.id)}
            className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              activeSection === item.id 
                ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg`
                : `text-gray-700 hover:bg-${item.color}-50 hover:text-${item.color}-600 border border-gray-100`
            }`}
          >
            <span className="font-semibold text-lg">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
