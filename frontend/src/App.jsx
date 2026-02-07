import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./Dashboards/Student"
import AdminDashboard from './AdminDashboard/AdminDashboard';
import HODDashboard from './Dashboards/HOD'
import ProfessorDashboard from "./Dashboards/Professor";
import ProtectedRoute from "./ProtectedRoute";
import Contact from "./pages/contact";
import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/hod-dashboard" element={<ProtectedRoute><HODDashboard /></ProtectedRoute>} />
        <Route path="/professor-dashboard" element={<ProtectedRoute><ProfessorDashboard /></ProtectedRoute>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
