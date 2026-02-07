import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import DepartmentList from './components/DepartmentList';
import AddDepartmentForm from './components/AddDepartmentForm';
import AddUserForm from './components/AddUserForm';
import UserList from './components/usersList';


function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [name, setName] = useState("");
  const [usercount, setUserCount] = useState([]);
  const [departments, setDepartment] = useState([]);
  const [departmentForm, setDepartmentForm] = useState({
    departmentName: "",
    programType: "UG",
    description: ""
  });

  // REAL stats from database (not mock data)
  const [stats, setStats] = useState({
    departments: 0,
    students: 0,
    professors: 0,
    hods: 0,
    totalUsers: 0
  });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    departmentName: "",
    programType: "UG",
    description: ""
  });

  const [users, setUsers] = useState([]);
  // Fetch dashboard stats from backend
  const fetchDashboardStats = async () => {
    try {
      const res = await fetch("http://localhost:3000/dashboard/stats");
      const data = await res.json();

      if (res.ok) {
        setStats({
          departments: data.totalDepartments || 0,
          students: data.totalStudents || 0,
          professors: data.totalProfessors || 0,
          hods: data.totalHODs || 0,
          totalUsers: data.totalUsers || 0
        });
      }
    } catch (err) {
      console.log("Error fetching stats:", err);
    }
  };

  // POST request to backend for adding department
  const addDepartment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/departments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departmentForm),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to add department");
        return;
      }

      alert("Department added successfully!");
      setDepartmentForm({ departmentName: "", programType: "UG", description: "" });
      departmentView();
      fetchDashboardStats(); // Refresh stats
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  // Delete department function
  const deleteDepartment = async (departmentId) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const res = await fetch(`http://localhost:3000/departments/delete/${departmentId}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Failed to delete department");
          return;
        }

        departmentView();
        fetchDashboardStats(); // Refresh stats
      } catch (err) {
        console.log(err);
        alert("Server error");
      }
    }
  };

  // Start editing a department
  const startEdit = (dept) => {
    setEditingId(dept._id);
    setEditForm({
      departmentName: dept.departmentName,
      programType: dept.programType,
      description: dept.description || ""
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ departmentName: "", programType: "UG", description: "" });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Update department function
  const updateDepartment = async (departmentId) => {
    try {
      const res = await fetch(`http://localhost:3000/departments/update/${departmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update department");
        return;
      }

      alert("Department updated successfully!");
      setEditingId(null);
      departmentView();
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  // Add user function (called from AddUserForm)
  const addUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:3000/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to add user");
        return false;
      }

      alert("User added successfully!");
      fetchDashboardStats(); // Refresh dashboard stats
      return true;
    } catch (err) {
      console.log(err);
      alert("Server error");
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Handle form input changes for department form
  const handleDepartmentChange = (e) => {
    setDepartmentForm({ ...departmentForm, [e.target.name]: e.target.value });
  };

  // Get all departments and user counts from backend
  const departmentView = async () => {
    try {
      const res = await fetch("http://localhost:3000/departments/all");
      const data = await res.json();

      const res2 = await fetch("http://localhost:3000/departments/getusercount");
      const userCnt = await res2.json();

      if (!res.ok || !res2.ok) {
        alert("Failed to fetch department or user count");
        return;
      }

      setDepartment(data);
      setUserCount(userCnt);
      setActiveSection("departments");
      setEditingId(null);
    } catch (err) {
      console.log("Error in departmentView");
      alert("Server error");
    }
  };

  // showing all usersList in users section
const showUser = async () => {
  try {
    const res = await fetch("http://localhost:3000/users/showAllUsers");

    if (!res.ok) {
      alert("Failed to load users");
      return;
    }
    const data = await res.json();
    setUsers(data);
    setActiveSection("users");   // IMPORTANT FIX
  }
  catch (err) {
    alert("error in showUser");
  }
}


  // Load initial data
  useEffect(() => {
    const name = localStorage.getItem("name");
    setName(name);
    fetchDashboardStats(); // Load stats when component mounts
    departmentView(); // Load departments
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardStats stats={stats} />;

      case 'departments':
        return (
          <DepartmentList
            departments={departments}
            usercount={usercount}
            searchTerm={searchTerm}
            filterType={filterType}
            editingId={editingId}
            editForm={editForm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            onFilterChange={(e) => setFilterType(e.target.value)}
            onStartEdit={startEdit}
            onDelete={deleteDepartment}
            onEditChange={handleEditChange}
            onUpdate={updateDepartment}
            onCancelEdit={cancelEdit}
          />
        );

      case 'addDepartment':
        return (
          <AddDepartmentForm
            formData={departmentForm}
            onSubmit={addDepartment}
            onChange={handleDepartmentChange}
          />
        );

      case 'users':
        return <UserList users={users} />;


      case 'addUser':
        return (
          <AddUserForm
            departments={departments}
            onAddUser={addUser}
            onSuccess={() => setActiveSection('dashboard')} // Go back to dashboard after success
          />
        );

      default:
        return <DashboardStats stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header name={name} onLogout={logout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onDepartmentView={departmentView}
            onUserView={showUser}
          />

          <div className="flex-1">
            {renderActiveSection()}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-lg">
            © 2025 Admin Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboard;