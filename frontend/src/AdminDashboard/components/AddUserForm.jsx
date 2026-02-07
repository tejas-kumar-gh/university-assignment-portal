import React, { useState } from 'react';

const AddUserForm = ({ departments, onAddUser, onSuccess }) => {
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    role: 'Student'
  });

  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await onAddUser(userForm);
      
      if (success) {
        // Reset form after successful submission
        setUserForm({
          name: '',
          email: '',
          password: '',
          phone: '',
          department: '',
          role: 'Student'
        });
        
        // Optionally go back to dashboard
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.log(err);
      alert("Form submission error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Add New User
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={userForm.email}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg"
              placeholder="Enter email address"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg"
              placeholder="Enter password (min. 6 characters)"
              required
              minLength="6"
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={userForm.phone}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg"
              placeholder="Enter phone number"
            />
          </div>

          {/* Department Dropdown */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
              Department *
            </label>
            <select
              name="department"
              value={userForm.department}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg bg-white"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.departmentName}
                </option>             
              )
            )
             
              }
              

            </select>
          </div>

          {/* Role Dropdown */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">
              Role *
            </label>
            <select
              name="role"
              value={userForm.role}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg bg-white"
              required
            >
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
              <option value="HOD">Head of Department (HOD)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Adding User...
              </div>
            ) : (
              'Add User'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;