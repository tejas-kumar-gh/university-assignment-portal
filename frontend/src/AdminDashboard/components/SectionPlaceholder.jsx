import React from 'react';

const SectionPlaceholder = ({ title, emoji, description, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{emoji}</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">{subtitle}</h3>
        <p className="text-gray-500 text-lg">{description}</p>
      </div>
    </div>
  );
};

export default SectionPlaceholder;