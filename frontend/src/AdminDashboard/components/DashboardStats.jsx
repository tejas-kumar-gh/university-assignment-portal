import React from 'react';

const DashboardStats = ({ stats }) => {
  const statCards = [
    { label: 'Total Departments', value: stats.departments, emoji: '🏛️', color: 'blue' },
    { label: 'Total Students', value: stats.students, emoji: '🎓', color: 'green' },
    { label: 'Total Professors', value: stats.professors, emoji: '👨‍🏫', color: 'purple' },
    { label: 'Total HODs', value: stats.hods, emoji: '👨‍💼', color: 'orange' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Dashboard Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div 
            key={card.label}
            className={`bg-gradient-to-br from-${card.color}-500 to-${card.color}-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300`}
          >
            <h3 className="text-lg font-semibold mb-3 opacity-90">{card.label}</h3>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">{card.value}</span>
              <div className="text-3xl">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;